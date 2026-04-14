import { sequelize } from '../config/db.js';
import { defineUsers } from './models/users.js';
import { defineTokens } from './models/tokens.js';

const models = {
  users: defineUsers(sequelize),
  tokens: defineTokens(sequelize),
};

export const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  ...models,
};

export async function connectDb() {
  await sequelize.authenticate();
}

