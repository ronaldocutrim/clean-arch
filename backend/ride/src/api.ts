import express from 'express';
import Ride from './ride';
import { client } from './postgress';

const app = express();

app.use(express.json());

app.post('/calculate_ride', function (req, res) {
  try {
    const ride = new Ride();
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculate();
    res.json({ price });
  } catch (e) {
    const error = e as Error;
    res.status(422).send(error.message);
  }
});

app.post('/passengers', async function (req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
  };
  const result = await client.query(
    `
  INSERT INTO passengers(name, email, document)
  VALUES($1, $2, $3)
  RETURNING *
`,
    [payload.name, payload.email, payload.document]
  );
  res.json({ passenger_id: result.rows[0].id });
});

app.post('/drivers', async function (req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    car_plate: req.body.car_plate,
  };

  const result = await client.query(
    `
  INSERT INTO drivers(name, email, document, car_plate)
  VALUES($1, $2, $3, $4)
  RETURNING *
`,
    [payload.name, payload.email, payload.document, payload.car_plate]
  );
  res.json({ driver_id: result.rows[0].id });
});

app.listen(3000, () => console.log('Running 🚀'));
