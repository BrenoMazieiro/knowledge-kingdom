import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../context';
import { UnauthorizedError } from '../errors/unauthorizedError';
import { ForbiddenError } from '../errors/forbiddenError';

const BM_PERMISSION_HIERARCHY: Record<string, number> = {
  [BMPermissionLevel.VIEWER]: 1,
  [BMPermissionLevel.EDITOR]: 2,
  [BMPermissionLevel.ADMIN]: 3,
};

export const requireAuth = (context: GraphQLContext): string => {
  if (!context.userId) {
    throw new UnauthorizedError();
  }
  return context.userId;
};

export const requireBMAuth = (context: GraphQLContext): string => {
  if (!context.bmId) {
    throw new UnauthorizedError('Backoffice authentication required');
  }
  return context.bmId;
};

export const requireBMPermission = (context: GraphQLContext, minLevel: BMPermissionLevel): string => {
  const bmId = requireBMAuth(context);
  const currentLevel = context.bmPermissionLevel;
  if (!currentLevel || (BM_PERMISSION_HIERARCHY[currentLevel] ?? 0) < (BM_PERMISSION_HIERARCHY[minLevel] ?? 0)) {
    throw new ForbiddenError(`Requires at least ${minLevel} permission level`);
  }
  return bmId;
};

export const requirePlayerNotBlocked = (context: GraphQLContext): string => {
  const userId = requireAuth(context);
  if (context.isBlocked) {
    throw new ForbiddenError('Your account has been blocked');
  }
  return userId;
};
