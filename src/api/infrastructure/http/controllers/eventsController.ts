import { Request, Response } from 'express';

import { CreateEventDto } from '@/api/application/dtos/CreateEventDto';
import { NotifyUserDto } from '@/api/application/dtos/NotifyUserDto';
import { createEventUseCase } from '@/api/application/use-cases/createEventUseCase';
import { notifyUserUseCase } from '@/api/application/use-cases/notifyUserUseCase';
import { sendSuccess } from '@/shared/entities/SuccessResponse';

import { EventsQuery } from '../../adapters/EventsQuery';
import { EventsRepository } from '../../adapters/EventsRepository';
import { UserPreferencesQuery } from '../../adapters/UserPreferencesQuery';
import { handler } from '../middleware/handler';

export const eventsController = (() => {
  const repository = new EventsRepository();
  const eventsQuery = new EventsQuery();
  const userPreferencesQuery = new UserPreferencesQuery();

  const createEvent = handler(async (req: Request, res: Response) => {
    const dto = new CreateEventDto(req.body);

    const createdId = await createEventUseCase(repository)(dto);

    sendSuccess(res, { id: createdId.toString() }, 201);
  });

  const notifyUser = handler(async (req: Request, res: Response) => {
    const dto = new NotifyUserDto(req.params);

    const data = await notifyUserUseCase(
      eventsQuery,
      userPreferencesQuery,
    )(dto);

    sendSuccess(res, data.getPayload(), data.getStatus());
  });

  return {
    createEvent,
    notifyUser,
  };
})();
