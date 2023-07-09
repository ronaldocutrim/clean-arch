import { Driver, SaveDriver, DriverDTO } from './driver';

export interface DriverRepository {
  find(params: {
    email: string;
    document: string;
    car_plate: string;
  }): Promise<DriverDTO | null>;
  create(params: SaveDriver.Params): Promise<SaveDriver.Result>;
}

export class SaveDriverUseCase implements SaveDriver {
  constructor(private readonly driverRepository: DriverRepository) {}
  async perform(params: SaveDriver.Params): Promise<SaveDriver.Result> {
    const { driverData } = new Driver(params);

    const alreadyExist = await this.driverRepository.find({
      document: driverData.document,
      email: driverData.email,
      car_plate: driverData.car_plate,
    });

    if (alreadyExist) throw new Error('conflit data');
    const result = await this.driverRepository.create(driverData);
    return result;
  }
}
