import { Driver } from '@/domain/models/driver';
import { SaveDriver } from '@/domain/usecases/save-driver';

export interface DriverRepository {
  find(params: {
    email: string;
    document: string;
    car_plate: string;
  }): Promise<Driver | null>;
  create(params: SaveDriver.Params): Promise<SaveDriver.Result>;
}
