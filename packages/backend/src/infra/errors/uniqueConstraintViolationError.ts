import { DomainError } from './domainError';
import type { EntityName } from '@kk/shared/constants/entityName';

export class UniqueConstraintViolationError extends DomainError {
  constructor(
    entityName: EntityName,
    field: string,
  ) {
    super(
      `${entityName}_UNIQUE_CONSTRAINT_VIOLATION_ERROR`,
      `${entityName} already exists with this ${field}`,
      { field },
    );
  }
}
