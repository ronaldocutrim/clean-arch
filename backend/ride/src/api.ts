import express from 'express';
import Ride from './domain/models/ride';

import { SaveDriverUseCase } from './application/usecases/save-driver';
import { PGPassengerRepository } from './infra/pg-passenger-repository';
import { SavePassengerUseCase } from './application/usecases/save-passenger';
import { PGDriverRepository } from './infra/pg-driver-repository';
import { PostgressAdapter } from './infra/database/pg-adapter';

const app = express();
const client = PostgressAdapter.getInstance();

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

  try {
    const passengerRepository = new PGPassengerRepository(client);
    const savePassengerUseCase = new SavePassengerUseCase(passengerRepository);
    const result = await savePassengerUseCase.perform(payload);
    res.json({ passenger_id: result.passengerId });
  } catch (e) {
    const error = e as Error;
    res.status(409).json({ message: error.message });
  }
});

app.post('/drivers', async function (req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    carPlate: req.body.car_plate,
  };
  try {
    const driverRepository = new PGDriverRepository(client);
    const saveDriverUseCase = new SaveDriverUseCase(driverRepository);
    const result = await saveDriverUseCase.perform(payload);
    res.json({ driver_id: result.driverId });
  } catch (e) {
    const error = e as Error;
    console.log(error.stack);
    res.status(409).json({ message: error.message });
  }
});

app.listen(3000, () => console.log('Running 🚀'));
