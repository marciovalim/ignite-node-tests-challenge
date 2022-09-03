import { Connection, createConnection } from 'typeorm';

let connection: Connection;

export type InitializeDatabaseOptions = {
  isTest?: boolean;
  runMigrations?: boolean;
}

export async function initializeDatabase({
  isTest = false,
  runMigrations = false
} : InitializeDatabaseOptions) {
  const host = isTest ? 'localhost' : 'database';
  connection = await createConnection({
    name: 'default',
    username: 'postgres',
    password: 'docker',
    type: 'postgres',
    host: host,
    port: 5432,
    database: 'fin_api',
    migrations: ["**/migrations/*.{ts,js}"],
    entities: ['**/entities/*.{ts,js}'],
  });

  if (!runMigrations) return;
  await connection.dropDatabase();
  await connection.runMigrations();
}

export async function closeDatabase({drop = false}): Promise<void> {
  if (drop) await connection.dropDatabase();
  await connection.close();
}
