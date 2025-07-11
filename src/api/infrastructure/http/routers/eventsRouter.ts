import { Router } from 'express';

import { EventsQuery } from '../../adapters/EventsQuery';
import { EventsRepository } from '../../adapters/EventsRepository';
import { UserPreferencesQuery } from '../../adapters/UserPreferencesQuery';
import { EventsController } from '../controllers/EventsController';

const controller = new EventsController(
  new EventsRepository(),
  new EventsQuery(),
  new UserPreferencesQuery(),
);

const eventsRouter = Router();

eventsRouter.post('/', controller.createEventHandler);
eventsRouter.post('/:eventId', controller.notifyUserHandler);

export { eventsRouter };
