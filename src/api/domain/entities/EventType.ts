import z from 'zod';

import { ValidationError } from '@/shared/errors/ValidationError';

const schema = z.object({
  type: z
    .string()
    .min(1, 'Event type cannot be empty')
    .regex(/^[a-z][a-z0-9]*(_[a-z0-9]+)*$/, 'Event type must be snake_case'),
});
export class EventType {
  constructor(public readonly type: string) {
    const result = schema.safeParse({ type });

    if (result.error) {
      throw new ValidationError(z.flattenError(result.error).fieldErrors);
    }
  }

  equals(other: EventType) {
    return this.type === other.type;
  }

  toString() {
    return this.type;
  }
}
