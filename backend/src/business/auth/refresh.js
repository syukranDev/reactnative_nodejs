import jwt from 'jsonwebtoken';
import { db } from '../../db/index.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';

function expToDate(token) {
  const decoded = jwt.decode(token);
  const expSeconds = decoded?.exp;
  if (!expSeconds) return new Date(Date.now() + 15 * 60 * 1000);
  return new Date(expSeconds * 1000);
}

export async function refresh(req, res) {
  try {
    const { refreshToken } = req.body ?? {};
    if (!refreshToken) return res.status(400).send({ message: 'refreshToken required' });

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const tokenRow = await db.tokens.findOne({
      where: { refresh_token: refreshToken, revoked_at: null },
      order: [['id', 'DESC']],
    });
    if (!tokenRow) return res.status(401).send({ message: 'Unauthorized' });

    const userId = payload.userId;
    const newAccessToken = signAccessToken({ userId });
    const newRefreshToken = signRefreshToken({ userId });

    await tokenRow.update({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      access_expires_at: expToDate(newAccessToken),
      refresh_expires_at: expToDate(newRefreshToken),
      updated_at: new Date(),
    });

    return res.status(200).send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}

