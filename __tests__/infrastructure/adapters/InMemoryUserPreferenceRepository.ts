import { CreateUserPreferenceDto } from '@/api/application/dtos/CreateUserPreferenceDto';
import { UpdateUserPreferenceDto } from '@/api/application/dtos/UpdateUserPreferenceDto';
import { IUserPreferencesRepository } from '@/api/application/ports/IUserPreferencesRepository';
import { UserPreference } from '@/api/domain/entities/UserPreference';
import { UserPreferencesAlreadyExists } from '@/api/domain/errors/UserPreferencesAlreadyExists';
import { Id } from '@/shared/entities/Id';

export class InMemoryUserPreferenceRepository
  implements IUserPreferencesRepository
{
  constructor(private userPreferences: UserPreference[] = []) {}

  async create(dto: CreateUserPreferenceDto): Promise<Id> {
    const existing = this.userPreferences.find((pref) =>
      pref.getUserId().equals(dto.getUserId()),
    );

    if (existing) throw new UserPreferencesAlreadyExists(dto.getUserId());

    this.userPreferences.push(
      new UserPreference(
        dto.getDndWindows(),
        dto.getPreferences(),
        dto.getTimezone(),
        dto.getUserId(),
      ),
    );

    return dto.getUserId();
  }

  async remove(entryId: Id): Promise<void> {
    this.userPreferences.filter((pref) => pref.getUserId().equals(entryId));
  }

  async update(entryId: Id, dto: UpdateUserPreferenceDto): Promise<void> {
    this.userPreferences.map((pref) =>
      pref.getUserId().equals(entryId)
        ? new UserPreference(
            dto.getDndWindows(),
            dto.getPreferences(),
            dto.getTimezone(),
            pref.getUserId(),
          )
        : pref,
    );
  }
}
