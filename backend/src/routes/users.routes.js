import { requireAuth } from '../middleware/auth.js';
import { listUsers } from '../business/users/listUsers.js';

export const usersRoutes = [
  { method: 'get', path: '/users', middlewares: [requireAuth], handler: listUsers },
];

