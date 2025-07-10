import { GetCommand } from '@aws-sdk/lib-dynamodb';

import { IUserPreferencesQuery } from '@/api/application/ports/IUserPreferencesQuery';
import { UserPreference } from '@/api/domain/entities/UserPreference';
import { UserTimezone } from '@/api/domain/entities/UserTimezone';
import { UserPreferenceNotFound } from '@/api/domain/errors/UserPreferenceNotFound';
import { db } from '@/db';
import { Id } from '@/shared/entities/Id';

export class UserPreferencesQuery implements IUserPreferencesQuery {
  private readonly table = 'UserPreferences';

  async findById(userId: Id): Promise<UserPreference> {
    const response = await db.send(
      new GetCommand({
        Key: { userId: userId.toString() },
        TableName: this.table,
      }),
    );

    if (!response.Item) {
      throw new UserPreferenceNotFound(userId);
    }

    const {
      dndWindows,
      preferences,
      timezone,
      userId: userIdFromDb,
    } = response.Item;

    return new UserPreference(
      dndWindows,
      preferences,
      new UserTimezone(timezone),
      new Id(userIdFromDb),
    );
  }
}
