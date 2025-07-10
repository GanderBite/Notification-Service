import { CreateUserPreferenceDto } from '../dtos/CreateUserPreferenceDto';
import { IUserPreferencesRepository } from '../ports/IUserPreferencesRepository';

export function createUserPreferenceUseCase(
  userPreferenceRepository: IUserPreferencesRepository,
) {
  return async (dto: CreateUserPreferenceDto) => {
    return userPreferenceRepository.create(dto);
  };
}
