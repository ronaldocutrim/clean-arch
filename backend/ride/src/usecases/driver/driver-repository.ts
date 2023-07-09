import { Client } from 'pg';
import { DriverRepository } from './save-driver';

import { DriverDTO, SaveDriver } from './driver';

export class PGDriverRepository implements DriverRepository {
  constructor(private readonly db: Client) {}
  async create(params: DriverDTO): Promise<SaveDriver.Result> {
    const result = await this.db.query(
      `
      INSERT INTO drivers (name, email, document, car_plate)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [params.name, params.email, params.document, params.car_plate]
    );

    const data = {
      driverId: result.rows[0].passenger_id as string,
    };

    return data;
  }
  async find(params: {
    email: string;
    document: string;
    car_plate: string;
  }): Promise<DriverDTO | null> {
    const driver = await this.db.query(
      `SELECT * FROM drivers WHERE email = $1 OR document= $2 OR car_plate= $3`,
      [params.email, params.document, params.car_plate]
    );
    if (!driver.rows.length) return null;
    return {
      document: driver.rows[0].document,
      email: driver.rows[0].email,
      id: driver.rows[0].id,
      name: driver.rows[0].name,
      car_plate: driver.rows[0].car_plate,
    };
  }
}
