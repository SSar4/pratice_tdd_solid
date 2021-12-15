/* eslint-disable @typescript-eslint/method-signature-style */
import { AddAccountModel } from '../../domain/usecase/add-account';
import { AcountModel } from '../usecases/addAccount/db-add-account-protocols';

export interface AddAccountRepository {
  add(account: AddAccountModel): Promise<AcountModel>;
}
