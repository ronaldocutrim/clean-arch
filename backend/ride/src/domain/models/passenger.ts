import { CpfValidator } from '@/domain/models/cpf';

export type PassengerDTO = {
  id?: string;
  name: string;
  email: string;
  document: string;
};

export class Passenger {
  constructor(readonly passengerData: PassengerDTO) {
    if (!passengerData.document || !passengerData.email || !passengerData.name)
      throw new Error('required data not provided');
    if (!CpfValidator.validate(passengerData.document))
      throw new Error('invalid document');
  }
}

export interface SavePassenger {
  perform(params: SavePassenger.Params): Promise<SavePassenger.Result>;
}

export namespace SavePassenger {
  export type Params = PassengerDTO;
  export type Result = {
    passengerId: string;
  };
}
