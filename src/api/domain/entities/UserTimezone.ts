import z from 'zod';

import { ValidationError } from '@/shared/errors/ValidationError';

const schema = z.object({
  timezone: z
    .string()
    .min(1)
    .max(50)
    .refine(
      (val) => {
        try {
          Intl.DateTimeFormat(undefined, { timeZone: val });
          return true;
        } catch {
          return false;
        }
      },
      {
        message: 'Invalid IANA timezone',
      },
    ),
});

export class UserTimezone {
  constructor(private readonly timezone: string) {
    const result = schema.safeParse({ timezone });

    if (result.error) {
      throw new ValidationError(z.flattenError(result.error).fieldErrors);
    }
  }

  toString() {
    return this.timezone;
  }
}
