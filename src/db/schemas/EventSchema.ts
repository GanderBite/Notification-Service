import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';

export const TableParams: CreateTableCommandInput = {
  AttributeDefinitions: [
    { AttributeName: 'eventId', AttributeType: 'S' },
    { AttributeName: 'userId', AttributeType: 'S' },
    { AttributeName: 'timestamp', AttributeType: 'S' },
  ],
  BillingMode: 'PAY_PER_REQUEST',
  GlobalSecondaryIndexes: [
    {
      IndexName: 'UserIdIndex',
      KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH' },
        { AttributeName: 'timestamp', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'KEYS_ONLY',
      },
    },
  ],
  KeySchema: [{ AttributeName: 'eventId', KeyType: 'HASH' }],
  SSESpecification: {
    Enabled: true,
  },
  TableName: 'Events',
  Tags: [
    {
      Key: 'Environment',
      Value: 'production',
    },
    {
      Key: 'Application',
      Value: 'events-service',
    },
  ],
};
