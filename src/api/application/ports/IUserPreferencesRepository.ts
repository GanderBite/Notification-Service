import { ICreatePort } from '@/shared/ports/ICreatePort';
import { IDeletePort } from '@/shared/ports/IDeletePort';
import { IUpdatePort } from '@/shared/ports/IUpdatePort';

import { CreateUserPreferenceDto } from '../dtos/CreateUserPreferenceDto';
import { UpdateUserPreferenceDto } from '../dtos/UpdateUserPreferenceDto';

export interface IUserPreferencesRepository
  extends ICreatePort<CreateUserPreferenceDto>,
    IDeletePort,
    IUpdatePort<UpdateUserPreferenceDto> {}
