import { createServer, type Server } from 'node:http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { formatError } from './infra/graphql/formatError';
import { depthLimitRule } from './infra/graphql/depthLimit';
import type { GraphQLContext, ContextFactory } from './context';
import type { GraphQLSchema } from 'graphql';
import { env } from './infra/config/env';

const apiRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { errors: [{ message: 'Too many requests, please try again later' }] },
});

export const createAppServer = async (
  schema: GraphQLSchema,
  contextFactory: ContextFactory,
): Promise<{ httpServer: Server }> => {
  const app = express();
  const httpServer = createServer(app);

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cookieParser());

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer<GraphQLContext>({
    schema,
    formatError,
    introspection: env.NODE_ENV !== 'production',
    validationRules: [depthLimitRule(10)],
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();

  const graphqlMiddleware = expressMiddleware(apolloServer, {
    context: async ({ req, res }) =>
      contextFactory(req as unknown as express.Request, res as unknown as express.Response),
  });

  app.use(
    '/graphql',
    apiRateLimit as express.RequestHandler,
    cors({ origin: env.FRONTEND_URL, credentials: true }) as express.RequestHandler,
    express.json({ limit: '1mb' }),
    graphqlMiddleware as unknown as express.RequestHandler,
  );

  return { httpServer };
};
