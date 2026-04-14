import { authRoutes } from './auth.routes.js';
import { systemRoutes } from './system.routes.js';
import { usersRoutes } from './users.routes.js';

export const routes = [...systemRoutes, ...authRoutes, ...usersRoutes];

export function registerRoutes(app) {
  for (const route of routes) {
    const method = route.method?.toLowerCase();
    const middlewares = route.middlewares ?? [];
    app[method](route.path, ...middlewares, route.handler);
  }
}

