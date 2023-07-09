import { DriverDTO, SaveDriver } from '@/usecases/driver/driver';
import {
  DriverRepository,
  SaveDriverUseCase,
} from '@/usecases/driver/save-driver';

class DriverRepositorySpy implements DriverRepository {
  driver?: DriverDTO;
  output = '';
  callsCount = 0;
  async create(params: DriverDTO): Promise<SaveDriver.Result> {
    this.callsCount++;
    this.driver = params;
    return {
      driverId: this.output,
    };
  }

  async find(params: {
    email: string;
    document: string;
  }): Promise<DriverDTO | null> {
    if (params.document === this.driver?.document)
      return this.driver as DriverDTO;
    return null;
  }
}

function makeSut() {
  const createDriverRepository = new DriverRepositorySpy();
  const sut = new SaveDriverUseCase(createDriverRepository);
  return {
    sut,
    createDriverRepository,
  };
}

describe('CreatePassenger', () => {
  test('Garantir que o repositorio vai ser chamado com os valores corretos', async () => {
    const { sut, createDriverRepository } = makeSut();

    const payload = {
      name: 'any_name',
      email: 'any_email',
      document: '61241093369',
      car_plate: '23bdc',
    };

    await sut.perform(payload);

    expect(createDriverRepository.driver).toEqual(payload);
  });
  test('Garantir que o repositorio vai ser chamado apenas uma vez', async () => {
    const { sut, createDriverRepository } = makeSut();
    const payload = {
      name: 'any_name',
      email: 'any_email',
      document: '61241093369',
      car_plate: '23bdc',
    };

    await sut.perform(payload);
    expect(createDriverRepository.callsCount).toBe(1);
  });

  test('Garantir um erro de conflito caso o passageiro ja esteja cadastrado', async () => {
    const { sut, createDriverRepository } = makeSut();
    const passengerPayload = {
      name: 'any_name',
      email: 'any_email',
      document: '00099735326',
      car_plate: '23bdc',
    };
    createDriverRepository.driver = passengerPayload;
    createDriverRepository.output = 'any_passenger_id';
    const payload = {
      ...passengerPayload,
    };
    const result = sut.perform(payload);
    await expect(result).rejects.toThrow();
  });
});
