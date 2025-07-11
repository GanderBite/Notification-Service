import { UpdateUserPreferenceDto } from '@/api/application/dtos/UpdateUserPreferenceDto';
import { UserPreferenceParamsDto } from '@/api/application/dtos/UserPreferenceParamsDto';
import { updateUserPreferenceUseCase } from '@/api/application/use-cases/updateUserPreferenceUseCase';
import { UserPreferenceNotFound } from '@/api/domain/errors/UserPreferenceNotFound';
import { Id } from '@/shared/entities/Id';

import { InMemoryUserPreferenceRepository } from '../../infrastructure/adapters/InMemoryUserPreferenceRepository';

describe('updateUserPreferenceUseCase', () => {
  it('should update database entry', async () => {
    const repository = new InMemoryUserPreferenceRepository();

    const userId = Id.generate().toString();

    const mockDto = new UpdateUserPreferenceDto({
      dndWindows: [],
      preferences: {},
      timezone: 'Europe/Warsaw',
      userId,
    });

    const params = new UserPreferenceParamsDto({ userId });

    await updateUserPreferenceUseCase(repository)(params, mockDto);
  });

  it('should throw UserPreferenceNotFoundError', async () => {
    const repository = new InMemoryUserPreferenceRepository();

    const userId = Id.generate().toString();

    const mockDto = new UpdateUserPreferenceDto({
      dndWindows: [],
      preferences: {},
      timezone: 'Europe/Warsaw',
      userId,
    });

    const params = new UserPreferenceParamsDto({ userId });

    try {
      await updateUserPreferenceUseCase(repository)(params, mockDto);
    } catch (err) {
      expect(err).toBeInstanceOf(UserPreferenceNotFound);
    }
  });
});
