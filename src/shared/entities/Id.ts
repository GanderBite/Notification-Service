import { z } from 'zod';

import { ValidationError } from '../errors/ValidationError';

const schema = z.object({
  id: z.uuidv4(),
});

export class Id {
  constructor(public readonly value: string) {
    const result = schema.safeParse({ id: value });

    if (result.error) {
      throw new ValidationError(z.flattenError(result.error).fieldErrors);
    }
  }

  equals(other: Id) {
    return this.value === other.value;
  }

  toString() {
    return this.value;
  }
}
