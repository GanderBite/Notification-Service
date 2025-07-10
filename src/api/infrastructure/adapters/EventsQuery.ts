import { GetCommand } from '@aws-sdk/lib-dynamodb';

import { IEventQuery } from '@/api/application/ports/IEventQuery';
import { Event } from '@/api/domain/entities/Event';
import { EventNotFoundError } from '@/api/domain/errors/EventNotFound';
import { db } from '@/db';
import { Id } from '@/shared/entities/Id';

export class EventsQuery implements IEventQuery {
  private readonly table = 'Events';

  async findById(eventId: Id): Promise<Event> {
    const response = await db.send(
      new GetCommand({
        Key: { eventId: eventId.toString() },
        TableName: this.table,
      }),
    );

    if (!response.Item) {
      throw new EventNotFoundError(eventId);
    }

    const {
      eventId: eventIdFromDb,
      eventType,
      payload,
      timestamp,
      userId,
    } = response.Item;

    return new Event(
      new Id(eventIdFromDb),
      eventType,
      payload,
      timestamp,
      new Id(userId),
    );
  }
}
