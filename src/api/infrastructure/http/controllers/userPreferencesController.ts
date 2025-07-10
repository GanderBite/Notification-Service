import { Request, Response } from 'express';

import { CreateUserPreferenceDto } from '@/api/application/dtos/CreateUserPreferenceDto';
import { createUserPreferenceUseCase } from '@/api/application/use-cases/createUserPreferenceUseCase';
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

  return {
    createUserPreference,
  };
})();
