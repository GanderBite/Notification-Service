import { Request, Response } from 'express';

import { CreateUserPreferenceDto } from '@/api/application/dtos/CreateUserPreferenceDto';
import { DeleteUserPreferenceDto } from '@/api/application/dtos/DeleteUserPreferenceDto';
import { createUserPreferenceUseCase } from '@/api/application/use-cases/createUserPreferenceUseCase';
import { deleteUserPreferenceUseCase } from '@/api/application/use-cases/deleteUserPreferenceUseCase';
import { sendSuccess } from '@/shared/entities/SuccessResponse';

import { UserPreferencesRepository } from '../../adapters/UserPreferencesRepository';
import { handler } from '../middleware/handler';

export const userPreferencesController = (() => {
  const repository = new UserPreferencesRepository();

  const createUserPreference = handler(async (req: Request, res: Response) => {
    const dto = new CreateUserPreferenceDto(req.body);

    const createdId = await createUserPreferenceUseCase(repository)(dto);

    sendSuccess(res, { id: createdId.toString() }, 201);
  });

  const deleteUserPreference = handler(async (req: Request, res: Response) => {
    const dto = new DeleteUserPreferenceDto(req.params);

    await deleteUserPreferenceUseCase(repository)(dto);

    sendSuccess(res, undefined, 204);
  });

  return {
    createUserPreference,
    deleteUserPreference,
  };
})();
