import { GraphQLError, type GraphQLFormattedError } from 'graphql';
import { DomainError } from '../errors/domainError';
import { EntityNotFoundError } from '../errors/entityNotFoundError';
import { EntityVersionMismatchError } from '../errors/entityVersionMismatchError';
import { UniqueConstraintViolationError } from '../errors/uniqueConstraintViolationError';
import { UnauthorizedError } from '../errors/unauthorizedError';
import { ForbiddenError } from '../errors/forbiddenError';
import { ValidationError } from '../errors/validationError';

export const formatError = (
  formattedError: GraphQLFormattedError,
  error: unknown,
): GraphQLFormattedError => {
  const originalError = error instanceof GraphQLError ? error.originalError ?? null : null;

  if (originalError instanceof ValidationError) {
    return {
      ...formattedError,
      message: originalError.message,
      extensions: {
        code: originalError.code,
        details: originalError.details,
      },
    };
  }

  if (originalError instanceof UnauthorizedError) {
    return {
      ...formattedError,
      message: originalError.message,
      extensions: { code: 'UNAUTHENTICATED' },
    };
  }

  if (originalError instanceof ForbiddenError) {
    return {
      ...formattedError,
      message: originalError.message,
      extensions: { code: 'FORBIDDEN' },
    };
  }

  if (originalError instanceof EntityNotFoundError) {
    return {
      ...formattedError,
      message: originalError.message,
      extensions: {
        code: originalError.code,
      },
    };
  }

  if (originalError instanceof EntityVersionMismatchError) {
    return {
      ...formattedError,
      message: originalError.message,
      extensions: {
        code: originalError.code,
        details: originalError.details,
      },
    };
  }

  if (originalError instanceof UniqueConstraintViolationError) {
    return {
      ...formattedError,
      message: originalError.message,
      extensions: {
        code: originalError.code,
        details: originalError.details,
      },
    };
  }

  if (originalError instanceof DomainError) {
    return {
      ...formattedError,
      message: originalError.message,
      extensions: {
        code: originalError.code,
        details: originalError.details,
      },
    };
  }

  return {
    ...formattedError,
    message: 'Internal server error',
    extensions: { code: 'INTERNAL_SERVER_ERROR' },
  };
};
