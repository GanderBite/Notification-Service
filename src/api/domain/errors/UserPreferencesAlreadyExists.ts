import { Id } from '@/shared/entities/Id';
import { ApiError } from '@/shared/errors/ApiError';

export class UserPreferencesAlreadyExists extends ApiError<{ userId: string }> {
  constructor(userId: Id) {
    super(409, 'User preferences already exists', {
      userId: userId.toString(),
    });
    this.name = 'UserPreferencesAlreadyExists';
  }
}
