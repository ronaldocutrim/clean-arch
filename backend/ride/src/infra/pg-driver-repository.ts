import { DriverRepository } from '@/application/repositories/driver-repository';
import { Driver } from '@/domain/models/driver';
import { SaveDriver } from '@/domain/usecases/save-driver';
import { Client } from 'pg';

export class PGDriverRepository implements DriverRepository {
  constructor(private readonly db: Client) {}
  async create(params: Driver): Promise<SaveDriver.Result> {
    const result = await this.db.query(
      `
      INSERT INTO drivers (name, email, document, car_plate)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [params.name, params.email, params.document, params.carPlate]
    );

    const data = {
      driverId: result.rows[0].id as string,
    };

    return data;
  }
  async find(params: {
    email: string;
    document: string;
    car_plate: string;
  }): Promise<Driver | null> {
    const driver = await this.db.query(
      `SELECT * FROM drivers WHERE email = $1 OR document= $2 OR car_plate= $3`,
      [params.email, params.document, params.car_plate]
    );
    if (!driver.rows.length) return null;
    return new Driver({
      document: driver.rows[0].document,
      email: driver.rows[0].email,
      id: driver.rows[0].id,
      name: driver.rows[0].name,
      carPlate: driver.rows[0].car_plate,
    });
  }
}
