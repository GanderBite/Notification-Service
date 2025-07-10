import { UserPreferenceParamsDto } from '../dtos/UserPreferenceParamsDto';
import { IUserPreferencesRepository } from '../ports/IUserPreferencesRepository';

export function deleteUserPreferenceUseCase(
  userPreferenceRepository: IUserPreferencesRepository,
) {
  return async (dto: UserPreferenceParamsDto) => {
    return userPreferenceRepository.remove(dto.getUserId());
  };
}
