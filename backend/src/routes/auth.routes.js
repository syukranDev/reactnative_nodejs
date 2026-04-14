import { login } from '../business/auth/login.js';
import { refresh } from '../business/auth/refresh.js';

export const authRoutes = [
  { method: 'post', path: '/auth/login', handler: login },
  { method: 'post', path: '/auth/refresh', handler: refresh },
];

