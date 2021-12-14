import { EmailValidatorAdapter } from './email-validatior-adapter';
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));
describe('Email Validator adapter', () => {
  test('devera retornar falso se a validação falhar', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalido_email@email.com');
    expect(isValid).toBe(false);
  });

  test('devera retornar true se a validação ñ falhar', () => {
    const sut = new EmailValidatorAdapter();
    sut.isValid('email valido');
    const isValid = sut.isValid('invalido_email@email.com');
    expect(isValid).toBe(true);
  });
});
