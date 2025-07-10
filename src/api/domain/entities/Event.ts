import { Id } from '@/shared/entities/Id';

import { EventPayload } from './EventPayload';
import { EventType } from './EventType';

export class Event {
  constructor(
    private eventId: Id,
    private eventType: EventType,
    private payload: EventPayload,
    private timestamp: string,
    private userId: Id,
  ) {}

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
