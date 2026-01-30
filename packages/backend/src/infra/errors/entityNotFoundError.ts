import { DomainError } from './domainError';
import type { EntityName } from '@kk/shared/constants/entityName';

export class EntityNotFoundError extends DomainError {
  constructor(
    entityName: EntityName,
    criteria: Record<string, unknown>,
  ) {
    super(
      `${entityName}_NOT_FOUND_ERROR`,
      `${entityName} not found`,
      criteria,
    );
  }
}
