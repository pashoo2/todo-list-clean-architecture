import Database from 'easy-json-database';
import { resolve } from 'path';

export function connectToDatabase(): Database {
  const dbFile = resolve(__dirname, '../../../db/data.json');
  const db = new Database(dbFile, {
    snapshots: {
      enabled: false,
    },
  });

  return db;
}
