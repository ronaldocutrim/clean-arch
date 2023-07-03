export class CpfValidator {
  private static MAX_CHAR_CPF = 11;

  private static getVerifierDigit(cpfArray: number[]) {
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

  private static isValidCpf(cpfNumber: string) {
    const cpf = CpfValidator.serializeCpf(cpfNumber);
    return !cpf || cpf.length >= CpfValidator.MAX_CHAR_CPF;
  }

  private static serializeCpf(cpfNumber: string) {
    return cpfNumber.replace(/\D/g, '');
  }

  static validate(cpfNumber: string): boolean {
    if (!CpfValidator.isValidCpf(cpfNumber)) return false;

    const serializedCpfNumber = CpfValidator.serializeCpf(cpfNumber);

    const repeatedDocumentNumbers = serializedCpfNumber
      .split('')
      .every((c) => c === serializedCpfNumber[0]);

    if (repeatedDocumentNumbers) return false;

    const arrayDocument = serializedCpfNumber.split('').map(Number);
    const arrayDocumentWithouVerifierDigit = arrayDocument.slice(0, -2);

    const firstMultiplierDigitResult = CpfValidator.getVerifierDigit(
      arrayDocumentWithouVerifierDigit
    );

    const secondMultiplierDigitResult = CpfValidator.getVerifierDigit([
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
