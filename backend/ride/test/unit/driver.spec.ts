import { Driver } from '@/domain/models/driver';

test('Deve criar um motorista', function () {
  const driver = new Driver({
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    document: '83432616074',
    carPlate: 'AAA9999',
  });
  expect(driver.name).toBe('John Doe');
  expect(driver.email.value).toBe('john.doe@gmail.com');
  expect(driver.document.value).toBe('83432616074');
  expect(driver.carPlate.value).toBe('AAA9999');
});

test('Não pode criar motorista com cpf inválido', function () {
  expect(
    () =>
      new Driver({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        document: '111',
        carPlate: 'AAA9999',
      })
  ).toThrow(new Error('Invalid Cpf'));
});

test('Não pode criar motorista com email inválido', function () {
  expect(
    () =>
      new Driver({
        name: 'John Doe',
        email: 'john.doe@gmail',
        document: '83432616074',
        carPlate: 'AAA9999',
      })
  ).toThrow(new Error('Invalid email'));
});

test('Não pode criar motorista com place do carro inválida', function () {
  expect(
    () =>
      new Driver({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074',
        carPlate: 'AAA99999',
      })
  ).toThrow(new Error('Invalid car plate'));
});
