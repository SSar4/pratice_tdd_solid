export class MissingParam extends Error {
  constructor(paramName: string) {
    super(`falta parametro: ${paramName}`);
    this.name = 'MissingParamError';
  }
}
