import { ApiError } from './ApiError';

export class ValidationError extends ApiError<
  Record<string, string[] | undefined>
> {
  constructor(errors: Record<string, string[] | undefined>) {
    super(400, 'Invalid input received.', errors);
    this.name = 'ValidationError';
  }
}
