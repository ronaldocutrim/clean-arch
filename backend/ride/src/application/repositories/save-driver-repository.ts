import { Driver } from '@/domain/models/driver';

export interface SaveDriverRepository {
  saveDriver(params: SaveDriverRepository.Params): SaveDriverRepository.Result;
}

export namespace SaveDriverRepository {
  export type Params = Driver;

  export type Result = Promise<{
    driverId: string;
  }>;
}
