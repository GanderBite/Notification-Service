import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { CreateUserPreferenceDto } from '@/api/application/dtos/CreateUserPreferenceDto';
import { IUserPreferencesRepository } from '@/api/application/ports/IUserPreferencesRepository';
import { CreateUserPreferenceError } from '@/api/domain/errors/CreateUserPreferenceError';
import { UserPreferencesAlreadyExists } from '@/api/domain/errors/UserPreferencesAlreadyExists';
import { db } from '@/db';
import { Id } from '@/shared/entities/Id';
import { logger } from '@/shared/utils/logger';

export class UserPreferencesRepository implements IUserPreferencesRepository {
  private readonly tableName = 'UserPreferences';

  async create(dto: CreateUserPreferenceDto): Promise<Id> {
    const command = new PutCommand({
      ConditionExpression: 'attribute_not_exists(userId)',
      Item: {
        dndWindows: dto.getDndWindows(),
        preferenceId: dto.getPreferenceId().toString(),
        preferences: dto.getPreferences(),
        userId: dto.getUserId().toString(),
      },
      TableName: this.tableName,
    });

    try {
      await db.send(command);

      return dto.getPreferenceId();
    } catch (err) {
      if (err instanceof ConditionalCheckFailedException) {
        throw new UserPreferencesAlreadyExists(dto.getUserId());
      }

      logger.error(err);
      throw new CreateUserPreferenceError();
    }
  }

  async remove(entryId: Id): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
