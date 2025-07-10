import { Id } from '../entities/Id';

export interface ICreatePort<TCreateDto> {
  create(dto: TCreateDto): Promise<Id>;
}
