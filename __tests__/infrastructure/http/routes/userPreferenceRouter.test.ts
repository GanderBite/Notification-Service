import express from 'express';
import request from 'supertest';

import { UserPreferencesController } from '@/api/infrastructure/http/controllers/UserPreferencesController';
import { errorMiddleware } from '@/api/infrastructure/http/middleware/errorMiddleware';

import { InMemoryUserPreferenceRepository } from '../../adapters/InMemoryUserPreferenceRepository';

function setupTestApp() {
  const controller = new UserPreferencesController(
    new InMemoryUserPreferenceRepository(),
  );
  const app = express();
  app.use(express.json());
  app.post('/user-preferences', controller.createUserPreferenceHandler);
  app.delete(
    '/user-preferences/:userId',
    controller.deleteUserPreferenceHandler,
  );
  app.put('/user-preferences/:userId', controller.updateUserPreferenceHandler);
  app.use(errorMiddleware);

  return app;
}

describe('userPreferencesRouter', () => {
  const app = setupTestApp();

  it('POST /user-preferences - Error', async () => {
    const res = await request(app).post('/user-preferences').send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('details', {
      dndWindows: ['Invalid input: expected array, received undefined'],
      preferences: ['Invalid input: expected record, received undefined'],
      timezone: ['Invalid input: expected string, received undefined'],
      userId: ['Invalid input: expected string, received undefined'],
    });
    expect(res.body).toHaveProperty('code', 'ValidationError');
    expect(res.body).toHaveProperty('success', false);
  });

  it('POST /user-preferences - Success', async () => {
    const res = await request(app)
      .post('/user-preferences')
      .send({
        dndWindows: [{ dayOfWeek: 6, endTime: '06:00', startTime: '22:00' }],
        preferences: {
          items_shipped: {
            channels: ['email'],
            enabled: true,
          },
        },
        timezone: 'Europe/Warsaw',
        userId: '2e2657e5-8d7b-4732-82cc-dbc78ad2a648',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
  });
});
