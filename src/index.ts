import dotenv from 'dotenv';
import express from 'express';

import { errorMiddleware } from './api/infrastructure/http/middleware/errorMiddleware';
import { eventsRouter } from './api/infrastructure/http/routers/eventsRouter';
import { userPreferencesRouter } from './api/infrastructure/http/routers/userPreferencesRouter';
import { httpLogger } from './shared/utils/logger';

dotenv.config();

const server = (() => {
  const app = express();
  app.use(express.json());
  app.use(httpLogger);
  app.use('/events', eventsRouter);
  app.use('/user-preferences', userPreferencesRouter);
  app.use(errorMiddleware);

  return app;
})();

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
