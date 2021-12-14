import { DbAddAccount } from './db-add-account';

/* eslint-disable @typescript-eslint/return-await */
describe('BdAddAccount UseCase', () => {
  test('devera chamar Encrypter com o pass correto', async () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve('Hash_value'));
      }
    }
    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
    const encriptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      nome: 'valid_nome',
      email: 'valid_email',
      pass: 'valid_pass',
    };
    await sut.add(accountData);
    expect(encriptSpy).toHaveBeenCalledWith('valid_pass');
  });
});
