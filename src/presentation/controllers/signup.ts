/* eslint-disable @typescript-eslint/lines-between-class-members */
import { HttpRequest, HttpResponse } from '../protocols/http';
import { badRequest, serverError } from '../helper/http.help';
import { EmailValidator, Contoller, SenhaValidator } from '../protocols/index';
import {
  InvalidParamError,
  MissingParam,
  PassConfirmInvalid,
} from '../erros/index';
import { AddAccount } from '../../domain/usecase/add-account';

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
  handle(httpRequest: HttpRequest): HttpResponse {
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
      this.addAccount.add({ nome, pass, email });
      return {
        statusCode: 200,
        body: {},
      };
    } catch (error) {
      return serverError();
    }
  }
}
