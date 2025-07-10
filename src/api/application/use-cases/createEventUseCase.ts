import { CreateEventDto } from '../dtos/CreateEventDto';
import { IEventRepository } from '../ports/IEventRepository';

export function createEventUseCase(eventsRepository: IEventRepository) {
  return async (dto: CreateEventDto) => {
    return eventsRepository.create(dto);
  };
}
