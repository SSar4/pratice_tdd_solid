/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/promise-function-async */
import { Encrypter } from '../../data/protocols/encrypter';
import bcrypt from 'bcrypt';
/* eslint-disable @typescript-eslint/no-extraneous-class */
export class BcryptAdapter implements Encrypter {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }
  async encrypt(value: string): Promise<string> {
    const res = await bcrypt.hash(value, this.salt);
    return res;
  }
}
