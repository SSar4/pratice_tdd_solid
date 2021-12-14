import { AcountModel } from '../../../domain/models/account';
import {
  AddAccount,
  AddAccountModel,
} from '../../../domain/usecase/add-account';
import { Encrypter } from '../../protocols/encrypter';

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AcountModel> {
    await this.encrypter.encrypt(account.pass);
    return await new Promise((resolve) =>
      resolve({
        id: 'string',
        nome: 'string',
        email: 'string',
        pass: 'string',
      })
    );
  }
}
