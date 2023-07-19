import axios from 'axios';

const driverData = {
  name: 'any_name',
  email: 'mae@email.com',
  document: '61241093369',
  car_plate: 'AAA8888',
};

const sutUrl = 'http://localhost:3000/drivers';

test('Deve retornar um erro de conflito se o email do motorista ja existir', async () => {
  const payload = {
    name: driverData.name,
    email: 'existis@email.com',
    document: driverData.document,
    car_plate: driverData.car_plate,
  };

  const response = await axios.post(sutUrl, payload);
  expect(response.status).toBe(409);
  expect(response.data.message).toBe('conflit data');
});

test('Deve retornar um erro de conflito se o documento do motorista ja existir', async () => {
  const payload = {
    name: driverData.name,
    email: driverData.email,
    document: '00099735326',
    car_plate: driverData.car_plate,
  };
  const response = await axios.post(sutUrl, payload);
  expect(response.status).toBe(409);
  expect(response.data.message).toBe('conflit data');
});

test('Deve retornar um erro de conflito se a placa do motorista ja existir', async () => {
  const payload = {
    name: driverData.name,
    email: driverData.email,
    document: driverData.document,
    car_plate: 'AAA9999',
  };
  const response = await axios.post(sutUrl, payload);
  expect(response.status).toBe(409);
  expect(response.data.message).toBe('conflit data');
});

test('Deve retornar um erro de required se a placa nao existir', async () => {
  const payload = {
    name: driverData.name,
    email: driverData.email,
    document: driverData.document,
    car_plate: null,
  };
  const response = await axios.post(sutUrl, payload);
  expect(response.status).toBe(409);
  expect(response.data.message).toBe('required data not provided');
});

test('Deve retornar um erro de required se o email nao existir', async () => {
  const payload = {
    name: driverData.name,
    email: null,
    document: driverData.document,
    car_plate: driverData.car_plate,
  };
  const response = await axios.post(sutUrl, payload);
  expect(response.status).toBe(409);
  expect(response.data.message).toBe('required data not provided');
});

test('Deve retornar um erro de required se o name nao existir', async () => {
  const payload = {
    name: null,
    email: driverData.email,
    document: driverData.document,
    car_plate: driverData.car_plate,
  };
  const response = await axios.post(sutUrl, payload);
  expect(response.status).toBe(409);
  expect(response.data.message).toBe('required data not provided');
});

test('Deve retornar um erro se o documento for invalido', async () => {
  const payload = {
    name: driverData.name,
    email: driverData.email,
    document: 'invalid_document',
    car_plate: driverData.car_plate,
  };
  const response = await axios.post(sutUrl, payload);
  expect(response.data.message).toBe('Invalid Cpf');
});

test('Deve cadastrar um motorista', async () => {
  const response = await axios.post(sutUrl, driverData);
  expect(response.status).toBe(200);
  expect(response.data.driver_id).toBeTruthy();
});
