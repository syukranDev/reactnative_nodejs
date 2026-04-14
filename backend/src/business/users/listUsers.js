import { db } from '../../db/index.js';

export async function listUsers(req, res) {
  try {
    const limit = Number(req.query.limit ?? 50);
    const users = await db.users.findAll({ limit });
    return res.status(200).send({ data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}

