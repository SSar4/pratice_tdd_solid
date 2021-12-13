export class PassConfirmInvalid extends Error {
  constructor() {
    super('confirme a senha');
    this.name = 'PassConfirmInvalid';
  }
}
