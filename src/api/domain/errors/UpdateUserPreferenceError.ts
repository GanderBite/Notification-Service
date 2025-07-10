import { ApiError } from '@/shared/errors/ApiError';

export class UpdateUserPreferenceError extends ApiError {
  constructor() {
    super(500, 'Failed to create user preference');
    this.name = 'UpdateUserPreferenceError';
  }
}
