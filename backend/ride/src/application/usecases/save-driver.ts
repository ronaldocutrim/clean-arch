import { DriverRepository } from '@/application/repositories/driver-repository';
import { SaveDriver } from '@/domain/usecases/save-driver';

export class SaveDriverUseCase implements SaveDriver {
  constructor(private readonly driverRepository: DriverRepository) {}
  async perform(params: SaveDriver.Params): Promise<SaveDriver.Result> {
    const driverData = params;

    const alreadyExist = await this.driverRepository.find({
      document: driverData.document,
      email: driverData.email,
      car_plate: driverData.carPlate,
    });

    if (alreadyExist) throw new Error('conflit data');
    const result = await this.driverRepository.create(driverData);
    return result;
  }
}
