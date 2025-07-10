import { ApiError } from '@/shared/errors/ApiError';

export class CreateEventError extends ApiError {
  constructor() {
    super(500, 'Failed to create event');
    this.name = 'CreateEventError';
  }
}
