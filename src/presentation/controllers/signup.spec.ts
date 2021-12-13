import { SigupController } from './signup';
import {
  MissingParam,
  InvalidParamError,
  ServerError,
  PassConfirmInvalid,
} from '../erros/index';
import { SenhaValidator } from '../protocols/index';
import { EmailValidator } from '../protocols/email-validator';
import { AddAccount, AddAccountModel } from '../../domain/usecase/add-account';
import { AcountModel } from '../../domain/models/account';

interface SutTypes {
  sut: SigupController;
  emailValidatorStub: EmailValidator;
  senhaValidatorStub: SenhaValidator;
  addAccountStub: AddAccount;
}

const makeEMailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccount => {
  class AddAcountStub implements AddAccount {
    add(account: AddAccountModel): AcountModel {
      const accountfake = {
        id: 'valid_id',
        nome: 'valid_nome',
        email: 'valid_email@email.com',
        pass: 'valid_pass',
      };
      return accountfake;
    }
  }
  return new AddAcountStub();
};

const makeEMailValidatorError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      throw new Error();
    }
  }
  return new EmailValidatorStub();
};

const makeSenhaValidator = (): SenhaValidator => {
  class SenhaValidatorStub implements SenhaValidator {
    isValid(senha: string): boolean {
      return true;
    }
  }
  return new SenhaValidatorStub();
};

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount();
  const emailValidatorStub = makeEMailValidator();
  const senhaValidatorStub = makeSenhaValidator();
  const sut = new SigupController(
    emailValidatorStub,
    senhaValidatorStub,
    addAccountStub
  );
  return {
    sut,
    emailValidatorStub,
    senhaValidatorStub,
    addAccountStub,
  };
};

describe('Signup Controller', () => {
  test('retorne 400 se o nome não for provido', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        // name: '',
        email: 'anyEmail@email.com',
        pass: 'any_pass',
        passConfirm: 'any_pass',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParam('nome'));
  });

  test('retorne 400 se o nome não for provido', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        nome: 'any_name',
        // email: 'anyEmail@email.com',
        pass: 'any_pass',
        passConfirm: 'any_pass',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParam('email'));
  });

  test('retorne 400 se o nome não for provido', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        nome: 'any_name',
        email: 'anyEmail@email.com',
        passConfirm: 'any_pass',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParam('pass'));
  });

  test('retorne 400 se o nome não for provido', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        nome: 'any_name',
        email: 'anyEmail@email.com',
        //   pass: 'any_pass',
        passConfirm: 'any_pass',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParam('pass'));
  });

  test('retorne 400 se o nome não for provido', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        nome: 'any_name',
        email: 'anyEmail@email.com',
        pass: 'any_pass',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParam('passConfirm'));
  });

  test('retorne 400 se email for invalido', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        nome: 'any_name',
        email: 'invalid_email',
        pass: 'any_pass',
        passConfirm: 'any_pass',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('retorne 400 se senha for invalido', () => {
    const { sut, senhaValidatorStub } = makeSut();
    jest.spyOn(senhaValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        nome: 'any_name',
        email: 'invalid_email',
        pass: 'any_pass',
        passConfirm: 'any_pass',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('senha'));
  });

  test('retorne 400 se email for correto', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        nome: 'any_name',
        email: 'any_email',
        pass: 'any_pass',
        passConfirm: 'any_pass',
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_email');
    // expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('retorne 500 se o email validator retornar uma exeção', () => {
    const emailValidatorStub = makeEMailValidatorError();
    const senhaValidatorStub = makeSenhaValidator();
    const addAccountStub = makeAddAccount();
    const sut = new SigupController(
      emailValidatorStub,
      senhaValidatorStub,
      addAccountStub
    );
    const httpRequest = {
      body: {
        nome: 'any_name',
        email: 'invalid_email',
        pass: 'any_pass',
        passConfirm: 'any_pass',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('retorne 400 pass != passconfirm retornar uma exeção', () => {
    const emailValidatorStub = makeEMailValidatorError();
    const senhaValidatorStub = makeSenhaValidator();
    const addAccountStub = makeAddAccount();
    const sut = new SigupController(
      emailValidatorStub,
      senhaValidatorStub,
      addAccountStub
    );
    const httpRequest = {
      body: {
        nome: 'any_name',
        email: 'invalid_email',
        pass: 'any_pass',
        passConfirm: 'invalid_pass',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new PassConfirmInvalid());
  });

  test('deve add se todos os campos forem validados corretamente', () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, 'add');

    const httpRequest = {
      body: {
        nome: 'valid_name',
        email: 'valid_email',
        pass: 'valid_pass',
        passConfirm: 'valid_pass',
      },
    };
    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      nome: 'valid_name',
      email: 'valid_email',
      pass: 'valid_pass',
    });
  });
});
