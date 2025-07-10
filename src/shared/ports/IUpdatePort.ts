import { Id } from '../entities/Id';

export interface IUpdatePort<TUpdateDto> {
  update(entryId: Id, dto: TUpdateDto): Promise<void>;
}
