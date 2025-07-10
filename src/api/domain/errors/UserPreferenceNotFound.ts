import { Id } from '@/shared/entities/Id';
import { ApiError } from '@/shared/errors/ApiError';

export class UserPreferenceNotFound extends ApiError<{ userId: string }> {
  constructor(userId: Id) {
    super(409, 'User preferences not found', {
      userId: userId.toString(),
    });
    this.name = 'UserPreferenceNotFound';
  }
}
