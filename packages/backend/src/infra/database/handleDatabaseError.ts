import type { EntityName } from '@kk/shared/constants/entityName';
import { UniqueConstraintViolationError } from '../errors/uniqueConstraintViolationError';

const PG_UNIQUE_VIOLATION = '23505';

type DatabaseError = Error & { code: string; detail?: string };

const isDatabaseError = (error: unknown): error is DatabaseError => {
  return error instanceof Error && 'code' in error;
};

export const handleDatabaseError = (error: unknown, entityName: EntityName): never => {
  if (isDatabaseError(error) && error.code === PG_UNIQUE_VIOLATION) {
    const detail = error.detail ? String(error.detail) : '';
    const fieldMatch = detail.match(/Key \((\w+)\)/);
    const field = fieldMatch ? fieldMatch[1] ?? 'unknown' : 'unknown';
    throw new UniqueConstraintViolationError(entityName, field);
  }
  throw error;
};
