import { Router } from 'express';

import { eventsController } from '../controllers/eventsController';

const eventsRouter = Router();

eventsRouter.post('/', eventsController.createEvent);
eventsRouter.post('/:eventId', eventsController.notifyUser);

export { eventsRouter };
