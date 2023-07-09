import { Passenger, SavePassenger, PassengerDTO } from './passenger';

export interface PassengerRepository {
  find(params: {
    email: string;
    document: string;
  }): Promise<PassengerDTO | null>;
  create(params: SavePassenger.Params): Promise<SavePassenger.Result>;
}

export class SavePassengerUseCase implements SavePassenger {
  constructor(private readonly passengerRepository: PassengerRepository) {}
  async perform(params: SavePassenger.Params): Promise<SavePassenger.Result> {
    const { passengerData } = new Passenger(params);

    const alreadyExist = await this.passengerRepository.find({
      document: passengerData.document,
      email: passengerData.email,
    });

    if (alreadyExist) throw new Error('conflit data');
    const result = await this.passengerRepository.create(passengerData);
    return result;
  }
}
