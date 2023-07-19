import { Cpf } from '@/domain/models/cpf';

function makeSut({ cpf }: { cpf: string }) {
  return {
    sut: new Cpf(cpf),
  };
}

describe('Validate Document', () => {
  it('ensure validate true with valid cpf', () => {
    const cpf = '11144477735';
    const { sut } = makeSut({ cpf });
    expect(sut.value).toBe(cpf);
  });

  it('ensure validate false with invalid cpf', () => {
    expect(() => makeSut({ cpf: '61241093361' })).toThrow(
      new Error('Invalid Cpf')
    );
  });

  it('ensure validate false with empty cpf', () => {
    expect(() => makeSut({ cpf: '' })).toThrow(new Error('Invalid Cpf'));
  });

  it('ensure validate false with repeated cpf', () => {
    expect(() => makeSut({ cpf: '000.000.000-00' })).toThrow(
      new Error('Invalid Cpf')
    );
  });

  it('ensure validate with mask cpf', () => {
    const { sut } = makeSut({ cpf: '111.444.777-35' });
    expect(sut.value).toBe('11144477735');
  });

  it('ensure validate with mask cpf and empty space', () => {
    const { sut } = makeSut({ cpf: '  111.444.777-35  ' });
    expect(sut.value).toBe('11144477735');
  });

  it('ensure validate with cpf first 0 digit', () => {
    const { sut } = makeSut({ cpf: '082.405.600-08' });
    expect(sut.value).toBe('08240560008');
  });

  it('ensure validate false with undefined cpf', () => {
    expect(() => makeSut({ cpf: '082.405.600-080000' })).toThrow(
      new Error('Invalid Cpf')
    );
  });
});
