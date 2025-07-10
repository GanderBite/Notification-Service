import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';
dotenv.config();

const db = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY || '',
    secretAccessKey: process.env.DYNAMODB_SECRET_KEY || '',
  },
  endpoint: process.env.DYNAMODB_ENDPOINT,
  region: process.env.DYNAMODB_REGION,
});

export { db };
