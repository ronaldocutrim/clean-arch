import { Cpf } from '@/domain/models/cpf';
import Email from './email';

export class Passenger {
  constructor(
    private readonly values: {
      id?: string;
      name: string;
      email: string;
      document: string;
    }
  ) {
    if (!values.document || !values.email || !values.name)
      throw new Error('required data not provided');
  }

  get id(): string | undefined {
    return this.values.id;
  }

  get name(): string {
    return this.values.name;
  }

  get email(): Email {
    return new Email(this.values.email);
  }

  get document(): Cpf {
    return new Cpf(this.values.document);
  }
}
