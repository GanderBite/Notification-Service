import { Id } from '@/shared/entities/Id';
import { ApiError } from '@/shared/errors/ApiError';

export class EventNotFoundError extends ApiError<{ eventId: string }> {
  constructor(eventId: Id) {
    super(404, 'Preference for event was not found', {
      eventId: eventId.toString(),
    });
  }
}
