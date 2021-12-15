import { AddAccountRepository } from '../../protocols/add-account-repository';
import { DbAddAccount } from './db-add-account';
import {
  AcountModel,
  AddAccountModel,
  Encrypter,
} from './db-add-account-protocols';
/* eslint-disable @typescript-eslint/return-await */
const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('Hash_value'));
    }
  }
  return new EncrypterStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AcountModel> {
      const fakeAccount = {
        id: 'value_id',
        nome: 'valid_nome',
        email: 'valid_email',
        pass: 'Hash_value',
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountRepositoryStub();
};
interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};
describe('BdAddAccount UseCase', () => {
  test('devera chamar Encrypter com o pass correto', async () => {
    const { sut, encrypterStub } = makeSut();
    const encriptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      nome: 'valid_nome',
      email: 'valid_email',
      pass: 'valid_pass',
    };
    await sut.add(accountData);
    expect(encriptSpy).toHaveBeenCalledWith('valid_pass');
  });

  test('devera lançar exeção Encrypter', async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const accountData = {
      nome: 'valid_nome',
      email: 'valid_email',
      pass: 'valid_pass',
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  test('devera chamar o addAccountRepository', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
      nome: 'valid_name',
      email: 'valid@gamil.com',
      pass: 'valid_pass',
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      nome: 'valid_name',
      email: 'valid@gamil.com',
      pass: 'Hash_value',
    });
  });

  test('devera retornar account no sucesso', async () => {
    const { sut } = makeSut();
    const accountData = {
      nome: 'valid_nome',
      email: 'valid_email',
      pass: 'valid_pass',
    };
    const account = await sut.add(accountData);
    console.log(account, '-------');
    expect(account).toEqual({
      id: 'value_id',
      nome: 'valid_nome',
      email: 'valid_email',
      pass: 'Hash_value',
    });
  });
});
