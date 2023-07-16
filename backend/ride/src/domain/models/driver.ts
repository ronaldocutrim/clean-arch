import { CpfValidator } from '@/domain/models/cpf';

export class Driver {
  constructor(
    private readonly values: {
      id?: string;
      name: string;
      email: string;
      document: string;
      carPlate: string;
    }
  ) {
    if (!values.carPlate || !values.document || !values.email || !values.name)
      throw new Error('required data not provided');
    if (!CpfValidator.validate(values.document))
      throw new Error('invalid document');
  }

  get id(): string | undefined {
    return this.values.id;
  }

  get name(): string {
    return this.values.name;
  }

  get email(): string {
    return this.values.email;
  }

  get document(): string {
    return this.values.document;
  }

  get carPlate(): string {
    return this.values.carPlate;
  }
}
