import { Id } from '../entities/Id';

export interface CreatePort<TDto> {
  create(dto: TDto): Promise<Id>;
}
