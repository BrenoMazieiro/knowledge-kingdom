import { DomainError } from './domainError';
import type { EntityName } from '@kk/shared/constants/entityName';

export class EntityVersionMismatchError extends DomainError {
  constructor(
    entityName: EntityName,
    criteria: Record<string, unknown>,
  ) {
    super(
      `${entityName}_VERSION_MISMATCH_ERROR`,
      `${entityName} version mismatch`,
      criteria,
    );
  }
}
