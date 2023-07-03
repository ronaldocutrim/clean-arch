interface CreatePassengerRepository {
  createPassenger(params: any): void;
}

class CreatePassengerRepositorySpy implements CreatePassengerRepository {
  passenger?: any;
  callsCount = 0;
  output?: string;
  async createPassenger(params: any) {
    this.passenger = params;
    this.callsCount++;
    return this.output;
  }
}

class CreatePassenger {
  constructor(
    private readonly createPassengerRepository: CreatePassengerRepository
  ) {}
  async perform(params: any) {
    return this.createPassengerRepository.createPassenger(params);
  }
}

function makeSut() {
  const createPassengerRepository = new CreatePassengerRepositorySpy();
  const sut = new CreatePassenger(createPassengerRepository);
  return {
    sut,
    createPassengerRepository,
  };
}

describe('CreatePassenger', () => {
  it('Should call repository with correct values', async () => {
    const { sut, createPassengerRepository } = makeSut();

    const payload = {
      name: 'any_name',
      email: 'any_email',
      document: 'any_document',
    };

    await sut.perform(payload);

    expect(createPassengerRepository.passenger).toEqual(payload);
  });
  it('Should call repository only one once', async () => {
    const { sut, createPassengerRepository } = makeSut();
    const payload = {
      name: 'any_name',
      email: 'any_email',
      document: 'any_document',
    };

    await sut.perform(payload);
    expect(createPassengerRepository.callsCount).toBe(1);
  });
  it('Should return passenger_id if success create', async () => {
    const { sut, createPassengerRepository } = makeSut();
    createPassengerRepository.output = 'any_passenger_id';
    const payload = {
      name: 'any_name',
      email: 'any_email',
      document: 'any_document',
    };

    const result = await sut.perform(payload);
    expect(result).toBe('any_passenger_id');
  });
  it.todo('Should throw if repeat email');
  it.todo('Should throw if repeat document');
  it.todo('Should throw if invalid document');
});
