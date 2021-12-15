import {
  AcountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from './db-add-account-protocols';

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;
  constructor(
    encrypter: Encrypter,
    addAccountRepesitory: AddAccountRepository
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepesitory;
  }

  async add(account: AddAccountModel): Promise<AcountModel> {
    const hash = await this.encrypter.encrypt(account.pass);
    const resp = await this.addAccountRepository.add(
      Object.assign({}, account, { pass: hash })
    );
    return await new Promise((resolve) => resolve(resp));
  }
}
