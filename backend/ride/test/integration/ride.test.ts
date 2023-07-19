import axios from 'axios';

const sutUrl = 'http://localhost:3000/calculate_ride';

test('Deve fazer o cálculo do preço de uma corrida durante o dia', async function () {
  const input = {
    segments: [{ distance: 10, date: '2021-03-01T10:00:00' }],
  };
  const response = await axios.post(sutUrl, input);
  const output = response.data;
  expect(output.price).toBe(21);
});

test('Se a distância for inválida deve lançar um erro', async function () {
  const input = {
    segments: [{ distance: -10, date: '2021-03-01T10:00:00' }],
  };
  const response = await axios.post(sutUrl, input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe('Invalid distance');
});
