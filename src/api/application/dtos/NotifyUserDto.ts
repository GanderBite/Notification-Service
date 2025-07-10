import z from 'zod';

import { Id } from '@/shared/entities/Id';
import { ValidationError } from '@/shared/errors/ValidationError';

const schema = z.object({
  eventId: z.uuidv4(),
});

export class NotifyUserDto {
  private eventId: Id;

  constructor(params: Record<string, unknown>) {
    const result = schema.safeParse(params);

    if (result.error) {
      throw new ValidationError(z.flattenError(result.error).fieldErrors);
    }

    const { eventId } = result.data;

    this.eventId = new Id(eventId);
  }

  getEventId() {
    return this.eventId;
  }
}
