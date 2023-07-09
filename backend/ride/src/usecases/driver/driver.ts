import { CpfValidator } from '@/cpf';

export type DriverDTO = {
  id?: string;
  name: string;
  email: string;
  document: string;
  car_plate: string;
};

export class Driver {
  constructor(readonly driverData: DriverDTO) {
    if (
      !driverData.car_plate ||
      !driverData.document ||
      !driverData.email ||
      !driverData.name
    )
      throw new Error('required data not provided');
    if (!CpfValidator.validate(driverData.document))
      throw new Error('invalid document');
  }
}

export interface SaveDriver {
  perform(params: SaveDriver.Params): Promise<SaveDriver.Result>;
}

export namespace SaveDriver {
  export type Params = DriverDTO;
  export type Result = {
    driverId: string;
  };
}
