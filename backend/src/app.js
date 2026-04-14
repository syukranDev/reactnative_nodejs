import express from 'express';
import morgan from 'morgan';
import { registerRoutes } from './routes/index.js';

export function createApp() {
  const app = express();

  app.use(morgan('combined'));
  app.use(express.json({ limit: '1mb' }));

  registerRoutes(app);

  return app;
}

