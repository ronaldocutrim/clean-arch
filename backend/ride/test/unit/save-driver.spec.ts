import { GetDriverRepository } from '@/application/repositories/get-driver-repository';
import { SaveDriverRepository } from '@/application/repositories/save-driver-repository';
import { SaveDriverUseCase } from '@/application/usecases/save-driver';
import { Driver } from '@/domain/models/driver';

class DriverRepositorySpy implements GetDriverRepository, SaveDriverRepository {
  driver?: any;
  output = '';
  callsCount = 0;

  async saveDriver(
    params: SaveDriverRepository.Params
  ): SaveDriverRepository.Result {
    this.callsCount++;
    this.driver = params;
    return {
      driverId: this.output,
    };
  }

  async getDriverById(
    params: GetDriverRepository.Params
  ): GetDriverRepository.Result {
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
      email: 'any_email@email.com',
      document: '61241093369',
      carPlate: 'aaa4444',
    };

    await sut.perform(payload);

    expect(createDriverRepository.driver).toEqual(new Driver(payload));
  });
  test('Garantir que o repositorio vai ser chamado apenas uma vez', async () => {
    const { sut, createDriverRepository } = makeSut();
    const payload = {
      name: 'any_name',
      email: 'any_email@email.com',
      document: '61241093369',
      carPlate: 'aaa4444',
    };

    await sut.perform(payload);
    expect(createDriverRepository.callsCount).toBe(1);
  });

  test('Garantir um erro de conflito caso o passageiro ja esteja cadastrado', async () => {
    const { sut, createDriverRepository } = makeSut();
    const driverPayload = {
      name: 'any_name',
      email: 'any_email',
      document: '00099735326',
      carPlate: '2333bdc',
    };
    createDriverRepository.driver = driverPayload;
    createDriverRepository.output = 'any_passenger_id';

    const payload = {
      ...driverPayload,
    };
    const result = sut.perform(payload);
    await expect(result).rejects.toThrow();
  });
});
