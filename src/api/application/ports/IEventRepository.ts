import { ICreatePort } from '@/shared/ports/ICreatePort';
import { Prettify } from '@/shared/types/Prettify';

import { CreateEventDto } from '../dtos/CreateEventDto';

export type IEventRepository = Prettify<ICreatePort<CreateEventDto>>;
