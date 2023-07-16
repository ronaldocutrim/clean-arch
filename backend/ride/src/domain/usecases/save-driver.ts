import { Driver } from '@/domain/models/driver';

export interface SaveDriver {
  perform(params: SaveDriver.Params): Promise<SaveDriver.Result>;
}

export namespace SaveDriver {
  export type Params = Driver;
  export type Result = {
    driverId: string;
  };
}
