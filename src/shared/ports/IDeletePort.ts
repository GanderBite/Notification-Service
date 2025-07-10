import { Id } from '../entities/Id';

export interface IDeletePort {
  remove(entryId: Id): Promise<void>;
}
