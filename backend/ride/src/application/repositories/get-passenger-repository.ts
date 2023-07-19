import { Passenger } from '@/domain/models/passenger';

export interface GetPassengerRepository {
  getPassenger(
    params: GetPassengerRepository.Params
  ): GetPassengerRepository.Result;
}

export namespace GetPassengerRepository {
  export type Params = {
    document: string;
    email: string;
  };

  export type Result = Promise<Passenger | null>;
}
