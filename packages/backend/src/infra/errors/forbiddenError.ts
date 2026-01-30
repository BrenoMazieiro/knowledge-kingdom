import { DomainError } from './domainError';

export class ForbiddenError extends DomainError {
  constructor(message = 'Forbidden') {
    super('FORBIDDEN_ERROR', message);
  }
}
