import { IEventQuery } from '@/api/application/ports/IEventQuery';
import { Event } from '@/api/domain/entities/Event';
import { EventNotFoundError } from '@/api/domain/errors/EventNotFound';
import { Id } from '@/shared/entities/Id';

export class InMemoryEventsQuery implements IEventQuery {
  constructor(private events: Event[] = []) {}

  async findById(eventId: Id): Promise<Event> {
    const existing = this.events.find((event) =>
      event.getEventId().equals(eventId),
    );

    if (!existing) {
      throw new EventNotFoundError(eventId);
    }

    return existing;
  }
}
