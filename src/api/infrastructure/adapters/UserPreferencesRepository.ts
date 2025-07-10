import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

import { CreateUserPreferenceDto } from '@/api/application/dtos/CreateUserPreferenceDto';
import { IUserPreferencesRepository } from '@/api/application/ports/IUserPreferencesRepository';
import { CreateUserPreferenceError } from '@/api/domain/errors/CreateUserPreferenceError';
import { DeleteUserPreferencesError } from '@/api/domain/errors/DeleteUserPreferencesError';
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
        preferences: dto.getPreferences(),
        userId: dto.getUserId().toString(),
      },
      TableName: this.tableName,
    });

    try {
      await db.send(command);

      return dto.getUserId();
    } catch (err) {
      if (err instanceof ConditionalCheckFailedException) {
        throw new UserPreferencesAlreadyExists(dto.getUserId());
      }

      logger.error(err);
      throw new CreateUserPreferenceError();
    }
  }

  async remove(entryId: Id): Promise<void> {
    const command = new DeleteCommand({
      Key: {
        userId: entryId.toString(),
      },
      TableName: this.tableName,
    });

    try {
      await db.send(command);
    } catch (err) {
      logger.error(err);
      throw new DeleteUserPreferencesError();
    }
  }
}
