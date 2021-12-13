export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Ivalid parametro: ${paramName}`);
    this.name = 'InvalidParamError';
  }
}
