import { Request, Response } from 'express';

import { CreateEventDto } from '@/api/application/dtos/CreateEventDto';
import { NotifyUserDto } from '@/api/application/dtos/NotifyUserDto';
import { IEventQuery } from '@/api/application/ports/IEventQuery';
import { IEventRepository } from '@/api/application/ports/IEventRepository';
import { IUserPreferencesQuery } from '@/api/application/ports/IUserPreferencesQuery';
import { createEventUseCase } from '@/api/application/use-cases/createEventUseCase';
import { notifyUserUseCase } from '@/api/application/use-cases/notifyUserUseCase';
import { sendSuccess } from '@/shared/entities/SuccessResponse';

import { handler } from '../middleware/handler';

export class EventsController {
  public createEventHandler = handler(this.createEvent.bind(this));

  public notifyUserHandler = handler(this.notifyUser.bind(this));

  constructor(
    private readonly repository: IEventRepository,
    private readonly eventsQuery: IEventQuery,
    private readonly userPreferencesQuery: IUserPreferencesQuery,
  ) {}

  private async createEvent(req: Request, res: Response): Promise<void> {
    const dto = new CreateEventDto(req.body);
    const createdId = await createEventUseCase(this.repository)(dto);
    sendSuccess(res, { id: createdId.toString() }, 201);
  }

  private async notifyUser(req: Request, res: Response): Promise<void> {
    const dto = new NotifyUserDto(req.params);
    const data = await notifyUserUseCase(
      this.eventsQuery,
      this.userPreferencesQuery,
    )(dto);

    sendSuccess(res, data.getPayload(), data.getStatus());
  }
}
