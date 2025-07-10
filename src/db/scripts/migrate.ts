import {
  CreateTableCommand,
  ListTablesCommand,
} from '@aws-sdk/client-dynamodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { db } from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMA_DIR = path.join(__dirname, './schemas');

(async () => {
  console.log('Running migrations from schemas directory...\n');
  const files = fs.readdirSync(SCHEMA_DIR).filter((f) => f.endsWith('.ts'));

  for (const file of files) {
    const schemaPath = path.join(SCHEMA_DIR, file);
    const schemaModule = await import(schemaPath);
    const params = schemaModule.TableParams;

    if (!params?.TableName) {
      console.warn(`Skipping ${file}: No valid TableParams export.`);
      continue;
    }

    try {
      const tables = await db.send(new ListTablesCommand({}));
      const exists = tables.TableNames?.includes(params.TableName);

      if (exists) {
        console.log(`Table already exists: ${params.TableName}`);
        continue;
      }
    } catch (err) {
      console.error(`❌ Failed to process schema file "${file}": ${err}}`);
    }

    try {
      await db.send(new CreateTableCommand(params));
    } catch (err) {
      console.error(`❌ Failed to process schema file "${file}": ${err}}`);
    }
  }

  console.log('\nAll migrations finished.');
})();
