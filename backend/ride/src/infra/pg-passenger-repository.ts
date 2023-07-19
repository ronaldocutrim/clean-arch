import { Passenger } from '@/domain/models/passenger';
import { SavePassengerRepository } from '@/application/repositories/save-passenger-repository';
import { GetPassengerRepository } from '@/application/repositories/get-passenger-repository';
import DatabaseConnection from './database/database-connection';

export class PGPassengerRepository
  implements SavePassengerRepository, GetPassengerRepository
{
  constructor(private readonly db: DatabaseConnection) {}
  async savePassenger(
    params: SavePassengerRepository.Params
  ): SavePassengerRepository.Result {
    const result = await this.db.query(
      `
      INSERT INTO passengers(name, email, document)
      VALUES($1, $2, $3)
      RETURNING *
    `,
      [params.name, params.email.value, params.document.value]
    );
    const data = {
      passengerId: result.rows[0].id as string,
    };

    return data;
  }
  async getPassenger(
    params: GetPassengerRepository.Params
  ): GetPassengerRepository.Result {
    const passenger = await this.db.query(
      `SELECT * FROM passengers WHERE email = $1 OR document= $2`,
      [params.email, params.document]
    );

    if (!passenger.rows.length) return null;
    return new Passenger({
      document: passenger.rows[0].document,
      email: passenger.rows[0].email,
      id: passenger.rows[0].id,
      name: passenger.rows[0].name,
    });
  }
}
