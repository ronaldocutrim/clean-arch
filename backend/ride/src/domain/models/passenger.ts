import { Cpf } from '@/domain/models/cpf';
import Email from './email';

export class Passenger {
  readonly id?: string;
  readonly name: string;
  readonly email: Email;
  readonly document: Cpf;

  constructor(values: {
    id?: string;
    name: string;
    email: string;
    document: string;
  }) {
    if (!values.document || !values.email || !values.name) {
      throw new Error('required data not provided');
    }

    this.email = new Email(values.email);
    this.name = values.name;
    this.document = new Cpf(values.document);
    this.id = values.id;
  }
}
