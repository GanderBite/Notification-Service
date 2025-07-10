import { ApiError } from '@/shared/errors/ApiError';

export class DeleteUserPreferencesError extends ApiError {
  constructor() {
    super(500, 'Failed to delete user preference');
    this.name = 'DeleteUserPreferencesError';
  }
}
