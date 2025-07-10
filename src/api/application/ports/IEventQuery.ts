import { Event } from '@/api/domain/entities/Event';
import { Id } from '@/shared/entities/Id';

export interface IEventQuery {
  findById(eventId: Id): Promise<Event>;
}
