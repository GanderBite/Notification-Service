import { Router } from 'express';

import { eventsController } from '../controllers/eventsController';

const eventsRouter = Router();

eventsRouter.post('/', eventsController.createEvent);

export { eventsRouter };
