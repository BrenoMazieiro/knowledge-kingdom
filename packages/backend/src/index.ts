import { pino } from 'pino';
import { env } from './infra/config/env';
import { createSchema } from './infra/graphql/schema';
import { resolvers } from './infra/graphql/resolverRegistry';
import { contextFactory } from './infra/graphql/contextModule';
import { taskQueue, taskWorker } from './infra/queue/queueModule';
import { createAppServer } from './server';

const logger = pino();

const main = async () => {
  const schema = createSchema(resolvers);

  taskWorker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, jobName: job?.name, err }, 'Task failed');
  });

  const { httpServer } = await createAppServer(schema, contextFactory);

  const shutdown = async () => {
    logger.info('Shutting down...');
    await taskWorker.close();
    await taskQueue.close();
    httpServer.close();
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  httpServer.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, 'Server started');
  });
};

main().catch((error) => {
  pino().error(error, 'Failed to start server');
  process.exit(1);
});
