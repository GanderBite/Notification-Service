import { IUserPreferencesQuery } from '@/api/application/ports/IUserPreferencesQuery';
import { UserPreference } from '@/api/domain/entities/UserPreference';
import { UserPreferenceNotFound } from '@/api/domain/errors/UserPreferenceNotFound';
import { Id } from '@/shared/entities/Id';

export class InMemoryUserPreferencesQuery implements IUserPreferencesQuery {
  constructor(private userPreferences: UserPreference[] = []) {}

  async findById(userId: Id): Promise<UserPreference> {
    const existing = this.userPreferences.find((pref) =>
      pref.getUserId().equals(userId),
    );

    if (!existing) throw new UserPreferenceNotFound(userId);

    return existing;
  }
}
