import z from 'zod';

import { DndWindow, dndWindowSchema } from '@/api/domain/entities/DndWindow';
import { Preference, preferenceSchema } from '@/api/domain/entities/Preference';
import { UserTimezone } from '@/api/domain/entities/UserTimezone';
import { ValidationError } from '@/shared/errors/ValidationError';

const schema = z.object({
  dndWindows: z.array(dndWindowSchema),
  preferences: z.record(z.string().min(1).max(50), preferenceSchema),
  timezone: z.string().min(1).max(100),
});

export class UpdateUserPreferenceDto {
  private dndWindows: Array<DndWindow>;
  private preferences: Record<string, Preference>;
  private timezone: UserTimezone;

  constructor(body: Record<string, unknown>) {
    const result = schema.safeParse(body);

    if (result.error) {
      throw new ValidationError(z.flattenError(result.error).fieldErrors);
    }

    const { dndWindows, preferences, timezone } = result.data;

    this.dndWindows = dndWindows;
    this.preferences = preferences;
    this.timezone = new UserTimezone(timezone);
  }

  getDndWindows() {
    return this.dndWindows;
  }

  getPreferences() {
    return this.preferences;
  }

  getTimezone() {
    return this.timezone;
  }
}
