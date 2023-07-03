import { Client } from 'pg';

export const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'docker',
  database: 'ride',
});

client.connect();
