import { AcountModel } from '../models/account';

/* eslint-disable @typescript-eslint/method-signature-style */
export interface AddAccountModel {
  nome: string;
  email: string;
  pass: string;
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AcountModel>;
}
