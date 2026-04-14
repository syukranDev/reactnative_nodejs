import { health } from '../business/system/health.js';

export const systemRoutes = [{ method: 'get', path: '/health', handler: health }];

