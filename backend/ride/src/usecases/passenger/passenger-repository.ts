import { Client } from 'pg';
import { PassengerDTO, SavePassenger } from './passenger';
import { PassengerRepository } from './save-passenger';

export class PGPassengerRepository implements PassengerRepository {
  constructor(private readonly db: Client) {}
  async create(params: PassengerDTO): Promise<SavePassenger.Result> {
    const result = await this.db.query(
      `
      INSERT INTO passengers(name, email, document)
      VALUES($1, $2, $3)
      RETURNING *
    `,
      [params.name, params.email, params.document]
    );
    const data = {
      passengerId: result.rows[0].id as string,
    };

    return data;
  }
  async find(params: {
    email: string;
    document: string;
  }): Promise<PassengerDTO | null> {
    const passenger = await this.db.query(
      `SELECT * FROM passengers WHERE email = $1 OR document= $2`,
      [params.email, params.document]
    );

    if (!passenger.rows.length) return null;
    return {
      document: passenger.rows[0].document,
      email: passenger.rows[0].email,
      id: passenger.rows[0].id,
      name: passenger.rows[0].name,
    };
  }
}
