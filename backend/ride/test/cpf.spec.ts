import { CpfValidator } from '@/cpf';

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

  it('ensure validate with mask cpf', () => {
    const { sut } = makeSut({ cpf: '111.444.777-35' });
    expect(sut).toBeTruthy();
  });

  it('ensure validate with mask cpf and empty space', () => {
    const { sut } = makeSut({ cpf: '  111.444.777-35  ' });
    expect(sut).toBeTruthy();
  });
});
