import { CpfValidator } from '@/domain/models/cpf';

function makeSut({ cpf }: { cpf: string }) {
  return {
    sut: CpfValidator.validate(cpf),
  };
}

describe('Validate Document', () => {
  it('ensure validate true with valid cpf', () => {
    const cpf = '11144477735';
    const { sut } = makeSut({ cpf });
    expect(sut).toBeTruthy();
  });

  it('ensure validate false with invalid cpf', () => {
    const { sut } = makeSut({ cpf: '61241093361' });
    expect(sut).toBeFalsy();
  });

  it('ensure validate false with empty cpf', () => {
    const { sut } = makeSut({ cpf: '' });
    expect(sut).toBeFalsy();
  });

  it('ensure validate false with repeated cpf', () => {
    const { sut } = makeSut({ cpf: '000.000.000-00' });
    expect(sut).toBeFalsy();
  });

  it('ensure validate with mask cpf', () => {
    const { sut } = makeSut({ cpf: '111.444.777-35' });
    expect(sut).toBeTruthy();
  });

  it('ensure validate with mask cpf and empty space', () => {
    const { sut } = makeSut({ cpf: '  111.444.777-35  ' });
    expect(sut).toBeTruthy();
  });

  it('ensure validate with cpf first 0 digit', () => {
    const { sut } = makeSut({ cpf: '082.405.600-08' });
    expect(sut).toBeTruthy();
  });

  it('ensure validate false with undefined cpf', () => {
    const { sut } = makeSut({ cpf: '082.405.600-080000' });
    expect(sut).toBeFalsy();
  });
});
