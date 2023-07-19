import { Passenger } from '@/domain/models/passenger';

export interface SavePassengerRepository {
  savePassenger(
    params: SavePassengerRepository.Params
  ): SavePassengerRepository.Result;
}

export namespace SavePassengerRepository {
  export type Params = Passenger;

  export type Result = Promise<{
    passengerId: string;
  }>;
}
