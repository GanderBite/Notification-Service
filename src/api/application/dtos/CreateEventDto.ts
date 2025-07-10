import { v4 } from 'uuid';
import z from 'zod';

import { EventType } from '@/api/domain/entities/EventType';
import { Id } from '@/shared/entities/Id';
import { ValidationError } from '@/shared/errors/ValidationError';
import dayjs from '@/shared/utils/dayjs';

const schema = z.object({
  eventType: z.string().min(1).max(50),
  payload: z.record(z.string(), z.unknown()),
  timestamp: z.string().refine((val) => dayjs(val, undefined, true).isValid(), {
    message: 'Invalid ISO 8601 date format',
  }),
  userId: z.uuidv4(),
});

export class CreateEventDto {
  private eventId: Id;
  private eventType: EventType;
  private payload: Record<string, unknown>;
  private timestamp: string;
  private userId: Id;

  constructor(body: Record<string, unknown>) {
    const result = schema.safeParse(body);

    if (result.error) {
      throw new ValidationError(z.flattenError(result.error).fieldErrors);
    }

    const { eventType, payload, timestamp, userId } = result.data;

    this.eventId = new Id(v4());
    this.eventType = new EventType(eventType);
    this.payload = payload;
    this.timestamp = dayjs.utc(timestamp).toISOString();
    this.userId = new Id(userId);
  }

  getEventId() {
    return this.eventId;
  }

  getEventType() {
    return this.eventType;
  }

  getPayload() {
    return this.payload;
  }

  getTimestamp() {
    return this.timestamp;
  }

  getUserId() {
    return this.userId;
  }
}
