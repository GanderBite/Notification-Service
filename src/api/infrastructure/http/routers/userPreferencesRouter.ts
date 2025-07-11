import { Router } from 'express';

import { UserPreferencesRepository } from '../../adapters/UserPreferencesRepository';
import { UserPreferencesController } from '../controllers/UserPreferencesController';

const controller = new UserPreferencesController(
  new UserPreferencesRepository(),
);

const userPreferencesRouter = Router();

userPreferencesRouter.post('/', controller.createUserPreferenceHandler);
userPreferencesRouter.delete(
  '/:userId',
  controller.deleteUserPreferenceHandler,
);
userPreferencesRouter.put('/:userId', controller.updateUserPreferenceHandler);

export { userPreferencesRouter };
