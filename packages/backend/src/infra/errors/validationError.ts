import { DomainError } from './domainError';

type FieldError = {
  path: string;
  message: string;
};

export class ValidationError extends DomainError {
  constructor(fields: FieldError[]) {
    super('VALIDATION_ERROR', 'Validation failed', { fields });
  }
}
