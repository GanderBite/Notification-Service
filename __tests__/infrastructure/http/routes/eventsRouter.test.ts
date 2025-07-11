import express from 'express';
import request from 'supertest';

import { EventsController } from '@/api/infrastructure/http/controllers/EventsController';
import { errorMiddleware } from '@/api/infrastructure/http/middleware/errorMiddleware';

import { InMemoryEventsQuery } from '../../adapters/InMemoryEventsQuery';
import { InMemoryEventsRepository } from '../../adapters/InMemoryEventsRepository';
import { InMemoryUserPreferencesQuery } from '../../adapters/InMemoryUserPreferencesQuery';

function setupTestApp() {
  const controller = new EventsController(
    new InMemoryEventsRepository(),
    new InMemoryEventsQuery(),
    new InMemoryUserPreferencesQuery(),
  );
  const app = express();
  app.use(express.json());
  app.post('/events', controller.createEventHandler);
  app.post('/events/:eventId', controller.notifyUserHandler);
  app.use(errorMiddleware);

  return app;
}

describe('eventsRouter', () => {
  const app = setupTestApp();

  it('POST /events - Error', async () => {
    const res = await request(app).post('/events').send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('details', {
      eventType: ['Invalid input: expected string, received undefined'],
      payload: ['Invalid input: expected record, received undefined'],
      timestamp: ['Invalid input: expected string, received undefined'],
      userId: ['Invalid input: expected string, received undefined'],
    });
    expect(res.body).toHaveProperty('code', 'ValidationError');
    expect(res.body).toHaveProperty('success', false);
  });

  it('POST /events - Success', async () => {
    const res = await request(app)
      .post('/events')
      .send({
        eventType: 'items_shipped',
        payload: {
          orderId: 'b7d9f7c2-3cb1-4eb4-87c2-6c3e29cd7891',
        },
        timestamp: '2025-07-09',
        userId: '2e2657e5-8d7b-4732-82cc-dbc78ad2a648',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
  });
});
