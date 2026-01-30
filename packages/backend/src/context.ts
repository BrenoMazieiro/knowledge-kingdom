import type { Request, Response } from 'express';
import type { ISessionRepository } from './modules/auth/repository/types';
import type { SessionEntity } from './modules/auth/repository/types';
import type { IBMSessionRepository } from './modules/backofficeManager/repository/types';
import type { DataLoaders } from './infra/graphql/dataloader';

export type GraphQLContext = {
  req: Request;
  res: Response;
  session: SessionEntity | null;
  userId: string | null;
  bmId: string | null;
  bmPermissionLevel: string | null;
  isBlocked: boolean;
  loaders: DataLoaders;
};

export type ContextFactory = (req: Request, res: Response) => Promise<GraphQLContext>;

type ContextFactoryDeps = {
  sessionRepository: ISessionRepository;
  bmSessionRepository: IBMSessionRepository;
  findUserBlocked: (userId: string) => Promise<boolean>;
  createLoaders: () => DataLoaders;
};

export const createContextFactory = (deps: ContextFactoryDeps): ContextFactory => {
  return async (req: Request, res: Response): Promise<GraphQLContext> => {
    const sessionId = req.cookies?.session_id ?? null;
    const bmSessionId = req.cookies?.bm_session_id ?? null;
    let session: SessionEntity | null = null;
    let userId: string | null = null;
    let bmId: string | null = null;
    let bmPermissionLevel: string | null = null;
    let isBlocked = false;

    if (sessionId) {
      session = await deps.sessionRepository.findById(sessionId);
      if (session) {
        userId = session.userId;
        await deps.sessionRepository.refresh(sessionId);
        isBlocked = await deps.findUserBlocked(userId);
      }
    }

    if (bmSessionId) {
      const bmSession = await deps.bmSessionRepository.findById(bmSessionId);
      if (bmSession) {
        bmId = bmSession.bmId;
        bmPermissionLevel = bmSession.permissionLevel;
        await deps.bmSessionRepository.refresh(bmSessionId);
      }
    }

    return { req, res, session, userId, bmId, bmPermissionLevel, isBlocked, loaders: deps.createLoaders() };
  };
};
