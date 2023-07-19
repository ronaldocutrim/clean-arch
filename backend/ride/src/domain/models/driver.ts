import { Cpf } from '@/domain/models/cpf';
import CarPlate from './car-plate';
import Email from './email';

export class Driver {
  readonly id?: string;
  readonly name: string;
  readonly email: Email;
  readonly document: Cpf;
  readonly carPlate: CarPlate;

  constructor(values: {
    id?: string;
    name: string;
    email: string;
    document: string;
    carPlate: string;
  }) {
    if (!values.carPlate || !values.document || !values.email || !values.name) {
      throw new Error('required data not provided');
    }

    this.carPlate = new CarPlate(values.carPlate);
    this.email = new Email(values.email);
    this.name = values.name;
    this.document = new Cpf(values.document);
    this.id = values.id;
  }
}
