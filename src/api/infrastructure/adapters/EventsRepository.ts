import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { CreateEventDto } from '@/api/application/dtos/CreateEventDto';
import { IEventRepository } from '@/api/application/ports/IEventRepository';
import { CreateEventError } from '@/api/domain/errors/CreateEventError';
import { db } from '@/db';
import { logger } from '@/shared/utils/logger';

export class EventsRepository implements IEventRepository {
  private readonly table = 'Events';

  async create(dto: CreateEventDto) {
    const command = new PutCommand({
      Item: {
        eventId: dto.getEventId().toString(),
        eventType: dto.getEventType().toString(),
        payload: dto.getPayload(),
        timestamp: dto.getTimestamp(),
        userId: dto.getUserId().toString(),
      },
      TableName: this.table,
    });

    try {
      await db.send(command);

      return dto.getEventId();
    } catch (err) {
      logger.error(err);
      throw new CreateEventError();
    }
  }
}
