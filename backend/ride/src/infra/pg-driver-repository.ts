import { GetDriverRepository } from '@/application/repositories/get-driver-repository';
import { SaveDriverRepository } from '@/application/repositories/save-driver-repository';
import { Driver } from '@/domain/models/driver';
import DatabaseConnection from './database/database-connection';

export class PGDriverRepository
  implements GetDriverRepository, SaveDriverRepository
{
  constructor(private readonly db: DatabaseConnection) {}

  async saveDriver(
    params: SaveDriverRepository.Params
  ): SaveDriverRepository.Result {
    const result = await this.db.query(
      `
      INSERT INTO drivers (name, email, document, car_plate)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [
        params.name,
        params.email.value,
        params.document.value,
        params.carPlate.value,
      ]
    );

    const data = {
      driverId: result.rows[0].id as string,
    };

    return data;
  }

  async getDriverById(
    params: GetDriverRepository.Params
  ): GetDriverRepository.Result {
    const driver = await this.db.query(
      `SELECT * FROM drivers WHERE email = $1 OR document= $2 OR car_plate= $3`,
      [params.email, params.document, params.carPlate]
    );
    if (!driver.rows.length) return null;
    try {
      return new Driver({
        document: driver.rows[0].document,
        email: driver.rows[0].email,
        id: driver.rows[0].id,
        name: driver.rows[0].name,
        carPlate: driver.rows[0].car_plate,
      });
    } catch {
      throw new Error('invalid data from database');
    }
  }
}
