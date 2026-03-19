import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { prisma } from './lib/prisma.js';

const main = async () => {
  await prisma.$connect();
  app.listen(env.PORT, () => {
    logger.info(`API running on http://localhost:${env.PORT}`);
  });
};

main().catch((err) => {
  logger.error({ err }, 'Startup error');
  process.exit(1);
});
