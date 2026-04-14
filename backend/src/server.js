import { env } from './config/env.js';
import { connectDb } from './db/index.js';
import { createApp } from './app.js';

async function main() {
  await connectDb();

  const app = createApp();
  app.listen(env.port);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

