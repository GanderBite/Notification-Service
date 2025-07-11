import { CreateEventDto } from '@/api/application/dtos/CreateEventDto';
import { IEventQuery } from '@/api/application/ports/IEventQuery';
import { IEventRepository } from '@/api/application/ports/IEventRepository';
import { Event } from '@/api/domain/entities/Event';
import { EventNotFoundError } from '@/api/domain/errors/EventNotFound';
import { Id } from '@/shared/entities/Id';

export class InMemoryEventsRepository implements IEventQuery, IEventRepository {
  constructor(private events: Event[] = []) {}
  async create(dto: CreateEventDto): Promise<Id> {
    this.events.push(
      new Event(
        dto.getEventId(),
        dto.getEventType(),
        dto.getPayload(),
        dto.getTimestamp(),
        dto.getUserId(),
      ),
    );

    return dto.getEventId();
  }

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
