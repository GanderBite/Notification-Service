import { Router } from 'express';

import { userPreferencesController } from '../controllers/userPreferencesController';

const userPreferencesRouter = Router();

userPreferencesRouter.post('/', userPreferencesController.createUserPreference);
userPreferencesRouter.delete(
  '/:userId',
  userPreferencesController.deleteUserPreference,
);

export { userPreferencesRouter };
