import {
  PassengerRepository,
  SavePassengerUseCase,
} from '@/application/usecases/save-passenger';
import { PassengerDTO, SavePassenger } from '@/domain/models/passenger';

class PassengerRepositorySpy implements PassengerRepository {
  passenger?: PassengerDTO;
  output = '';
  callsCount = 0;
  async create(params: PassengerDTO): Promise<SavePassenger.Result> {
    this.callsCount++;
    this.passenger = params;
    return {
      passengerId: this.output,
    };
  }

  async find(params: {
    email: string;
    document: string;
  }): Promise<PassengerDTO | null> {
    if (params.document === this.passenger?.document)
      return this.passenger as PassengerDTO;
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
      email: 'any_email',
      document: '61241093369',
    };

    await sut.perform(payload);

    expect(createPassengerRepository.passenger).toEqual(payload);
  });
  test('Garantir que o repositorio vai ser chamado apenas uma vez', async () => {
    const { sut, createPassengerRepository } = makeSut();
    const payload = {
      name: 'any_name',
      email: 'any_email',
      document: '61241093369',
    };

    await sut.perform(payload);
    expect(createPassengerRepository.callsCount).toBe(1);
  });

  test('Garantir um erro de conflito caso o passageiro ja esteja cadastrado', async () => {
    const { sut, createPassengerRepository } = makeSut();
    const passengerPayload = {
      name: 'any_name',
      email: 'any_email',
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
