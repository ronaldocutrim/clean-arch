import { DriverRepository } from '@/application/repositories/driver-repository';
import { SaveDriverUseCase } from '@/application/usecases/save-driver';
import { Driver } from '@/domain/models/driver';
import { SaveDriver } from '@/domain/usecases/save-driver';

class DriverRepositorySpy implements DriverRepository {
  driver?: Driver;
  output = '';
  callsCount = 0;
  async create(params: Driver): Promise<SaveDriver.Result> {
    this.callsCount++;
    this.driver = params;
    return {
      driverId: this.output,
    };
  }

  async find(params: {
    email: string;
    document: string;
  }): Promise<Driver | null> {
    if (params.document === this.driver?.document) return this.driver as Driver;
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

describe('CreateDriver', () => {
  test('Garantir que o repositorio vai ser chamado com os valores corretos', async () => {
    const { sut, createDriverRepository } = makeSut();

    const payload = {
      name: 'any_name',
      email: 'any_email',
      document: '61241093369',
      carPlate: '23bdc',
    };

    await sut.perform(new Driver(payload));

    expect(createDriverRepository.driver).toEqual(new Driver(payload));
  });
  test('Garantir que o repositorio vai ser chamado apenas uma vez', async () => {
    const { sut, createDriverRepository } = makeSut();
    const payload = {
      name: 'any_name',
      email: 'any_email',
      document: '61241093369',
      carPlate: '23bdc',
    };

    await sut.perform(new Driver(payload));
    expect(createDriverRepository.callsCount).toBe(1);
  });

  test('Garantir um erro de conflito caso o passageiro ja esteja cadastrado', async () => {
    const { sut, createDriverRepository } = makeSut();
    const passengerPayload = {
      name: 'any_name',
      email: 'any_email',
      document: '00099735326',
      carPlate: '23bdc',
    };
    createDriverRepository.driver = new Driver(passengerPayload);
    createDriverRepository.output = 'any_passenger_id';
    const payload = {
      ...passengerPayload,
    };
    const result = sut.perform(new Driver(payload));
    await expect(result).rejects.toThrow();
  });
});
