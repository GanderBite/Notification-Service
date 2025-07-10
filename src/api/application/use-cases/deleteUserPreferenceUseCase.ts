import { Id } from '@/shared/entities/Id';

import { DeleteUserPreferenceDto } from '../dtos/DeleteUserPreferenceDto';
import { IUserPreferencesRepository } from '../ports/IUserPreferencesRepository';

export function deleteUserPreferenceUseCase(
  userPreferenceRepository: IUserPreferencesRepository,
) {
  return async (dto: DeleteUserPreferenceDto) => {
    return userPreferenceRepository.remove(dto.getUserId());
  };
}
