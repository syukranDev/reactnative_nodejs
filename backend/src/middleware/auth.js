import { verifyAccessToken } from '../utils/jwt.js';

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization ?? '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const payload = verifyAccessToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

