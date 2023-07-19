import { Driver } from '@/domain/models/driver';
import { SaveDriver } from '@/domain/usecases/save-driver';
import { GetDriverRepository } from '../repositories/get-driver-repository';
import { SaveDriverRepository } from '../repositories/save-driver-repository';

export class SaveDriverUseCase implements SaveDriver {
  constructor(
    private readonly driverRepository: GetDriverRepository &
      SaveDriverRepository
  ) {}
  async perform(params: SaveDriver.Params): Promise<SaveDriver.Result> {
    const driverData = new Driver(params);

    const alreadyExist = await this.driverRepository.getDriverById({
      document: driverData.document.value,
      email: driverData.email.value,
      carPlate: driverData.carPlate.value,
    });

    if (alreadyExist) throw new Error('conflit data');
    const result = await this.driverRepository.saveDriver(driverData);
    return result;
  }
}
