import { Passenger } from '@/domain/models/passenger';

test('Deve criar um passageiro', function () {
  const passenger = new Passenger({
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    document: '83432616074',
  });

  expect(passenger.name).toBe('John Doe');
  expect(passenger.email.value).toBe('john.doe@gmail.com');
  expect(passenger.document.value).toBe('83432616074');
});

test('Não pode criar passageiro com cpf inválido', function () {
  expect(
    () =>
      new Passenger({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        document: ' 61241093368',
      })
  ).toThrow(new Error('Invalid Cpf'));
});

test('Não pode criar passageiro com email inválido', function () {
  expect(
    () =>
      new Passenger({
        name: 'John Doe',
        email: 'john.doegmail.com',
        document: '83432616074',
      })
  ).toThrow(new Error('Invalid email'));
});
