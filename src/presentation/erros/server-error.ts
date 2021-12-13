export class ServerError extends Error {
  constructor() {
    super('erro no servidor');
    this.name = 'ServerError';
  }
}
