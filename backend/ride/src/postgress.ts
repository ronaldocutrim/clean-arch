import { Client } from 'pg';

export class PostgresClient {
  private static instance?: Client;

  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'docker',
      database: 'ride',
    });
    await client.connect();
    this.instance = client;
    return this.instance;
  }

  static async disconect() {
    if (this.instance) this.instance.end();
    this.instance = undefined;
  }
}
