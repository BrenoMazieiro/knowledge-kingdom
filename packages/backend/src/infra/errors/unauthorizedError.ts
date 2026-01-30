import { DomainError } from './domainError';

export class UnauthorizedError extends DomainError {
  constructor(message = 'Unauthorized') {
    super('UNAUTHORIZED_ERROR', message);
  }
}
