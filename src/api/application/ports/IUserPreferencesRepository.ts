import { ICreatePort } from '@/shared/ports/ICreatePort';
import { IDeletePort } from '@/shared/ports/IDeletePort';

import { CreateUserPreferenceDto } from '../dtos/CreateUserPreferenceDto';

export interface IUserPreferencesRepository
  extends ICreatePort<CreateUserPreferenceDto>,
    IDeletePort {}
