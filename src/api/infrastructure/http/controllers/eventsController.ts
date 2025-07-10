import { Request, Response } from 'express';

import { CreateEventDto } from '@/api/application/dtos/CreateEventDto';
import { createEventUseCase } from '@/api/application/use-cases/createEventUseCase';
import { sendSuccess } from '@/shared/entities/SuccessResponse';

import { EventsRepository } from '../../adapters/EventsRepository';
import { handler } from '../middleware/handler';

export const eventsController = (() => {
  const repository = new EventsRepository();

  const createEvent = handler(async (req: Request, res: Response) => {
    const dto = new CreateEventDto(req.body);

    const createdId = await createEventUseCase(repository)(dto);

    sendSuccess(res, { id: createdId.toString() }, 201);
  });

  return {
    createEvent,
  };
})();
