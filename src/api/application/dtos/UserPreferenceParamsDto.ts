import z from 'zod';

import { Id } from '@/shared/entities/Id';
import { ValidationError } from '@/shared/errors/ValidationError';

const schema = z.object({
  userId: z.uuidv4(),
});
export class UserPreferenceParamsDto {
  private userId: Id;

  constructor(params: Record<string, unknown>) {
    const result = schema.safeParse(params);
    if (result.error) {
      throw new ValidationError(z.flattenError(result.error).fieldErrors);
    }

    this.userId = new Id(result.data.userId);
  }

  getUserId() {
    return this.userId;
  }
}
