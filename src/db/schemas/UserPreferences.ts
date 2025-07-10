import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';

export const TableParams: CreateTableCommandInput = {
  AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
  BillingMode: 'PAY_PER_REQUEST',
  KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
  TableName: 'UserPreferences',
};
