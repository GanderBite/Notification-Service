import { CreateUserPreferenceDto } from '@/api/application/dtos/CreateUserPreferenceDto';
import { createUserPreferenceUseCase } from '@/api/application/use-cases/createUserPreferenceUseCase';
import { UserPreferencesAlreadyExists } from '@/api/domain/errors/UserPreferencesAlreadyExists';
import { Id } from '@/shared/entities/Id';

import { InMemoryUserPreferenceRepository } from '../../infrastructure/adapters/InMemoryUserPreferenceRepository';

describe('createUserPreferenceUseCase - Integration', () => {
  it('should create an entry in database', async () => {
    const repository = new InMemoryUserPreferenceRepository();

    const userId = Id.generate().toString();

    const mockDto = new CreateUserPreferenceDto({
      dndWindows: [],
      preferences: {},
      timezone: 'Europe/Warsaw',
      userId,
    });

    const id = await createUserPreferenceUseCase(repository)(mockDto);

    expect(id.toString()).toEqual(userId);
  });

  it('should throw UserPreferencesAlreadyExistsError', async () => {
    const repository = new InMemoryUserPreferenceRepository();

    const userId = Id.generate().toString();

    const mockDto = new CreateUserPreferenceDto({
      dndWindows: [],
      preferences: {},
      timezone: 'Europe/Warsaw',
      userId,
    });

    const execute = createUserPreferenceUseCase(repository);

    try {
      await execute(mockDto);
      await execute(mockDto);
    } catch (err) {
      expect(err).toBeInstanceOf(UserPreferencesAlreadyExists);
    }
  });
});
