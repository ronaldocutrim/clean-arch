export class Cpf {
  private MAX_CHAR_CPF = 11;

  constructor(readonly value: string) {
    if (!this.validate(value)) throw new Error('Invalid Cpf');
    this.value = this.serializeCpf(value);
  }

  private getVerifierDigit(cpfArray: number[]) {
    const result = Array.from(cpfArray)
      .reverse()
      .reduce((acc, value, index) => {
        const number = index + 2;
        const currentValue = value * number;
        return currentValue + acc;
      }, 0);
    const rest = result % 11;

    return rest < 2 ? 0 : 11 - rest;
  }

  private isValidCpf(cpfNumber: string) {
    const cpf = this.serializeCpf(cpfNumber);
    return cpf.length >= this.MAX_CHAR_CPF;
  }

  private serializeCpf(cpfNumber: string) {
    return cpfNumber.replace(/\D/g, '');
  }

  private validate(cpfNumber: string): boolean {
    if (!cpfNumber || !this.isValidCpf(cpfNumber)) return false;

    const serializedCpfNumber = this.serializeCpf(cpfNumber);

    const repeatedDocumentNumbers = serializedCpfNumber
      .split('')
      .every((c) => c === serializedCpfNumber[0]);

    if (repeatedDocumentNumbers) return false;

    const arrayDocument = serializedCpfNumber.split('').map(Number);
    const arrayDocumentWithouVerifierDigit = arrayDocument.slice(0, -2);

    const firstMultiplierDigitResult = this.getVerifierDigit(
      arrayDocumentWithouVerifierDigit
    );

    const secondMultiplierDigitResult = this.getVerifierDigit([
      ...arrayDocumentWithouVerifierDigit,
      firstMultiplierDigitResult,
    ]);

    const arrayVerifierDigit = arrayDocument.slice(9, 11);

    return (
      firstMultiplierDigitResult === arrayVerifierDigit[0] &&
      secondMultiplierDigitResult === arrayVerifierDigit[1]
    );
  }
}
