import { UserPreference } from '@/api/domain/entities/UserPreference';
import { Id } from '@/shared/entities/Id';

export interface IUserPreferencesQuery {
  findById: (userId: Id) => Promise<UserPreference>;
}
