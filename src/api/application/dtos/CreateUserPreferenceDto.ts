import z from 'zod';

import { DndWindow, dndWindowSchema } from '@/api/domain/entities/DndWindow';
import { Preference, preferenceSchema } from '@/api/domain/entities/Preference';
import { UserTimezone } from '@/api/domain/entities/UserTimezone';
import { Id } from '@/shared/entities/Id';
import { ValidationError } from '@/shared/errors/ValidationError';

const schema = z.object({
  dndWindows: z.array(dndWindowSchema),
  preferences: z.record(z.string().min(1).max(50), preferenceSchema),
  timezone: z.string().min(1).max(100),
  userId: z.uuidv4(),
});

export class CreateUserPreferenceDto {
  private dndWindows: Array<DndWindow>;
  private preferenceId: Id;
  private preferences: Record<string, Preference>;
  private timezone: UserTimezone;
  private userId: Id;

  constructor(body: Record<string, unknown>) {
    const result = schema.safeParse(body);

    if (result.error) {
      throw new ValidationError(z.flattenError(result.error).fieldErrors);
    }

    const { dndWindows, preferences, timezone, userId } = result.data;

    this.dndWindows = dndWindows;
    this.preferenceId = Id.generate();
    this.preferences = preferences;
    this.timezone = new UserTimezone(timezone);
    this.userId = new Id(userId);
  }

  getDndWindows() {
    return this.dndWindows;
  }

  getPreferenceId() {
    return this.preferenceId;
  }

  getPreferences() {
    return this.preferences;
  }

  getTimezone() {
    return this.timezone;
  }

  getUserId(): Id {
    return this.userId;
  }
}
