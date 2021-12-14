import { SenhaValidator } from '../presentation/protocols/senha-validatoor';

export class SenhaValidatorAdapter implements SenhaValidator {
  isValid(senha: string): boolean {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])(?:([0-9a-zA-Z!@#$%;*(){}_+^&])(?!\1)){6,}$/;
    if (regex.test(senha)) {
      return true;
    } else {
      return false;
    }
  }
}
