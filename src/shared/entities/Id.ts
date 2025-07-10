import { v4 } from 'uuid';
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

  static generate() {
    return new Id(v4());
  }

  equals(other: Id) {
    return this.value === other.value;
  }

  toString() {
    return this.value;
  }
}
