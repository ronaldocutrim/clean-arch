import { GetPassengerRepository } from '@/application/repositories/get-passenger-repository';
import { SavePassengerRepository } from '@/application/repositories/save-passenger-repository';
import { SavePassengerUseCase } from '@/application/usecases/save-passenger';
import { Passenger } from '@/domain/models/passenger';
import { SavePassenger } from '@/domain/usecases/save-passenger';

class PassengerRepositorySpy
  implements GetPassengerRepository, SavePassengerRepository
{
  passenger?: any;
  output = '';
  callsCount = 0;
  async savePassenger(
    params: SavePassengerRepository.Params
  ): SavePassengerRepository.Result {
    this.callsCount++;
    this.passenger = params;
    return {
      passengerId: this.output,
    };
  }

  async getPassenger(
    params: GetPassengerRepository.Params
  ): GetPassengerRepository.Result {
    if (params.document === this.passenger?.document)
      return this.passenger as Passenger;
    return null;
  }
}

function makeSut() {
  const createPassengerRepository = new PassengerRepositorySpy();
  const sut = new SavePassengerUseCase(createPassengerRepository);
  return {
    sut,
    createPassengerRepository,
  };
}

describe('CreatePassenger', () => {
  test('Garantir que o repositorio vai ser chamado com os valores corretos', async () => {
    const { sut, createPassengerRepository } = makeSut();

    const payload = {
      name: 'any_name',
      email: 'any_email@email.com',
      document: '61241093369',
    };

    await sut.perform(payload);

    expect(createPassengerRepository.passenger).toEqual(new Passenger(payload));
  });
  test('Garantir que o repositorio vai ser chamado apenas uma vez', async () => {
    const { sut, createPassengerRepository } = makeSut();
    const payload = {
      name: 'any_name',
      email: 'any_email@email.com',
      document: '61241093369',
    };

    await sut.perform(payload);
    expect(createPassengerRepository.callsCount).toBe(1);
  });

  test('Garantir um erro de conflito caso o passageiro ja esteja cadastrado', async () => {
    const { sut, createPassengerRepository } = makeSut();
    const passengerPayload = {
      name: 'any_name',
      email: 'any_email@email.com',
      document: '00099735326',
    };
    createPassengerRepository.passenger = passengerPayload;
    createPassengerRepository.output = 'any_passenger_id';
    const payload = {
      ...passengerPayload,
    };
    const result = sut.perform(payload);
    await expect(result).rejects.toThrow();
  });
});
