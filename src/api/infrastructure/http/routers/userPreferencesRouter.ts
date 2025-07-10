import { Router } from 'express';

import { userPreferencesController } from '../controllers/userPreferencesController';

const userPreferencesRouter = Router();

userPreferencesRouter.post('/', userPreferencesController.createUserPreference);

export { userPreferencesRouter };
