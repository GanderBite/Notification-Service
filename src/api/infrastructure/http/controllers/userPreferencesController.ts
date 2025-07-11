import { Request, Response } from 'express';

import { CreateUserPreferenceDto } from '@/api/application/dtos/CreateUserPreferenceDto';
import { UpdateUserPreferenceDto } from '@/api/application/dtos/UpdateUserPreferenceDto';
import { UserPreferenceParamsDto } from '@/api/application/dtos/UserPreferenceParamsDto';
import { IUserPreferencesRepository } from '@/api/application/ports/IUserPreferencesRepository';
import { createUserPreferenceUseCase } from '@/api/application/use-cases/createUserPreferenceUseCase';
import { deleteUserPreferenceUseCase } from '@/api/application/use-cases/deleteUserPreferenceUseCase';
import { updateUserPreferenceUseCase } from '@/api/application/use-cases/updateUserPreferenceUseCase';
import { sendSuccess } from '@/shared/entities/SuccessResponse';

import { handler } from '../middleware/handler';

export class UserPreferencesController {
  public createUserPreferenceHandler = handler(
    this.createUserPreference.bind(this),
  );

  public deleteUserPreferenceHandler = handler(
    this.deleteUserPreference.bind(this),
  );

  public updateUserPreferenceHandler = handler(
    this.updateUserPreference.bind(this),
  );

  constructor(private repository: IUserPreferencesRepository) {}

  private async createUserPreference(
    req: Request,
    res: Response,
  ): Promise<void> {
    const dto = new CreateUserPreferenceDto(req.body);
    const createdId = await createUserPreferenceUseCase(this.repository)(dto);
    sendSuccess(res, { id: createdId.toString() }, 201);
  }

  private async deleteUserPreference(
    req: Request,
    res: Response,
  ): Promise<void> {
    const dto = new UserPreferenceParamsDto(req.params);
    await deleteUserPreferenceUseCase(this.repository)(dto);
    sendSuccess(res, undefined, 204);
  }

  private async updateUserPreference(
    req: Request,
    res: Response,
  ): Promise<void> {
    const params = new UserPreferenceParamsDto(req.params);
    const dto = new UpdateUserPreferenceDto(req.body);
    await updateUserPreferenceUseCase(this.repository)(params, dto);
    sendSuccess(res, undefined, 204);
  }
}
