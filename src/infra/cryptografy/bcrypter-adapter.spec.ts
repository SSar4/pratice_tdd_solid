/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypter-adapter';
jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'));
  },
}));
const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};
describe('Bcrypter Adapter', () => {
  test('devera chamar o bcrypt com os valores corretos', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    console.log(hashSpy);
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12);
  });

  test('devera chamar o bcrypt com os valores corretos on sucess', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash');
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });
});
