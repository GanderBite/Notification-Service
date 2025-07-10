import { ApiError } from '@/shared/errors/ApiError';

import { EventType } from '../entities/EventType';

export class PreferenceNotFoundError extends ApiError<{ eventType: string }> {
  constructor(eventType: EventType) {
    super(404, 'Preference for event was not found', {
      eventType: eventType.toString(),
    });
  }
}
