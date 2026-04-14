import jwt from 'jsonwebtoken';
import { db } from '../../db/index.js';
import { signAccessToken, signRefreshToken } from '../../utils/jwt.js';

function expToDate(token) {
  const decoded = jwt.decode(token);
  const expSeconds = decoded?.exp;
  if (!expSeconds) return new Date(Date.now() + 15 * 60 * 1000);
  return new Date(expSeconds * 1000);
}

export async function login(req, res) {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).send({ message: 'email and password required' });
    }

    const user = await db.users.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const payload = { userId: user.id };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await db.tokens.create({
      user_id: user.id,
      access_token: accessToken,
      refresh_token: refreshToken,
      access_expires_at: expToDate(accessToken),
      refresh_expires_at: expToDate(refreshToken),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return res.status(200).send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}

