import axios from 'axios';

const passengerData = {
  name: 'any_name',
  email: 'mae@email.com',
  document: '61241093369',
};

const sutUrl = 'http://localhost:3000/passengers';

test('Deve retornar um erro de conflito se o email do passageiro ja existir', async () => {
  const payload = {
    name: passengerData.name,
    email: 'existis@email.com',
    document: passengerData.document,
  };
  const response = await axios.post(sutUrl, payload);
  expect(response.status).toBe(409);
  expect(response.data.message).toBe('conflit data');
});

test('Deve retornar um erro de conflito se o documento do passageiro ja existir', async () => {
  const payload = {
    name: passengerData.name,
    email: passengerData.email,
    document: '37759595999',
  };
  const response = await axios.post(sutUrl, payload);
  expect(response.status).toBe(409);
  expect(response.data.message).toBe('conflit data');
});

test('Deve retornar um erro se o documento for invalido', async () => {
  const payload = {
    name: passengerData.name,
    email: passengerData.email,
    document: 'invalid_document',
  };
  const response = await axios.post(sutUrl, payload);
  expect(response.data.message).toBe('Invalid Cpf');
});

test('Deve cadastrar um passageiro', async () => {
  const response = await axios.post(sutUrl, passengerData);

  expect(response.status).toBe(200);
  expect(response.data.passenger_id).toBeTruthy();
});
