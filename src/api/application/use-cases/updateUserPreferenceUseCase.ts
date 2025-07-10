import { UpdateUserPreferenceDto } from '../dtos/UpdateUserPreferenceDto';
import { UserPreferenceParamsDto } from '../dtos/UserPreferenceParamsDto';
import { IUserPreferencesRepository } from '../ports/IUserPreferencesRepository';

export function updateUserPreferenceUseCase(
  userPreferenceRepository: IUserPreferencesRepository,
) {
  return async (
    paramsDto: UserPreferenceParamsDto,
    updateDto: UpdateUserPreferenceDto,
  ) => {
    return userPreferenceRepository.update(paramsDto.getUserId(), updateDto);
  };
}
