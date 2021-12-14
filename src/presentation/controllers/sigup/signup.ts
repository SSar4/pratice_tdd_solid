/* eslint-disable @typescript-eslint/lines-between-class-members */
import {
  HttpRequest,
  HttpResponse,
  Contoller,
  EmailValidator,
  AddAccount,
  SenhaValidator,
} from './sigup-protocols';
import { badRequest, serverError, ok } from '../../helper/http.help';
import {
  InvalidParamError,
  MissingParam,
  PassConfirmInvalid,
} from '../../erros/index';
export class SigupController implements Contoller {
  private readonly addAccount: AddAccount;
  private readonly emailValidator: EmailValidator;
  private readonly senhaValidator: SenhaValidator;
  constructor(
    emailValidator: EmailValidator,
    senhaValidator: SenhaValidator,
    addAccount: AddAccount
  ) {
    this.emailValidator = emailValidator;
    this.senhaValidator = senhaValidator;
    this.addAccount = addAccount;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['nome', 'email', 'pass', 'passConfirm'];
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParam(field));
        }
      }
      const { email, pass, passConfirm, nome } = httpRequest.body;
      if (pass !== passConfirm) {
        return badRequest(new PassConfirmInvalid());
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const isValidSenha = this.senhaValidator.isValid(pass);
      if (!isValidSenha) {
        return badRequest(new InvalidParamError('senha'));
      }
      const account = await this.addAccount.add({ nome, pass, email });
      return ok(account);
    } catch (error) {
      return serverError();
    }
  }
}
