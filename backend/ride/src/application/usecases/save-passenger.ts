import { Passenger } from '@/domain/models/passenger';
import { SavePassenger } from '@/domain/usecases/save-passenger';
import { GetPassengerRepository } from '../repositories/get-passenger-repository';
import { SavePassengerRepository } from '../repositories/save-passenger-repository';

export class SavePassengerUseCase implements SavePassenger {
  constructor(
    private readonly passengerRepository: GetPassengerRepository &
      SavePassengerRepository
  ) {}
  async perform(params: SavePassenger.Params): Promise<SavePassenger.Result> {
    const passengerData = new Passenger(params);

    const alreadyExist = await this.passengerRepository.getPassenger({
      document: passengerData.document.value,
      email: passengerData.email.value,
    });

    if (alreadyExist) throw new Error('conflit data');
    const result = await this.passengerRepository.savePassenger(passengerData);
    return result;
  }
}
