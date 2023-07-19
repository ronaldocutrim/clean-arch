import { Client } from 'pg';
import DatabaseConnection from './database-connection';

// Frameworks and Drivers
export class PostgressAdapter implements DatabaseConnection {
  private static instance?: PostgressAdapter;
  private connection: Client;
  private isConnected = false;

  private constructor() {
    this.connection = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'docker',
      database: 'ride',
    });
  }

  static getInstance(): PostgressAdapter {
    if (!PostgressAdapter.instance) {
      PostgressAdapter.instance = new PostgressAdapter();
    }
    return PostgressAdapter.instance;
  }

  async connectIfNeeded(): Promise<Client> {
    if (!this.isConnected) {
      await this.connection.connect();
      this.isConnected = true;
    }
    return this.connection;
  }

  async query(statement: string, params: any): Promise<any> {
    const connection = await this.connectIfNeeded();
    return connection.query(statement, params);
  }

  async close(): Promise<void> {
    if (this.isConnected) {
      await this.connection.end();
      this.isConnected = false;
    }
  }
}
