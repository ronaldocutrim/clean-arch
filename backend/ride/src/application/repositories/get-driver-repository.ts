import { Driver } from '@/domain/models/driver';

export interface GetDriverRepository {
  getDriverById(params: GetDriverRepository.Params): GetDriverRepository.Result;
}

export namespace GetDriverRepository {
  export type Params = {
    document: string;
    email: string;
    carPlate: string;
  };

  export type Result = Promise<Driver | null>;
}
