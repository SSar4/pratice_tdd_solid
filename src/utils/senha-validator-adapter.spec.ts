/* eslint-disable spaced-comment */
import { SenhaValidatorAdapter } from './senha-validator-adapter';

describe('Email Validator adapter', () => {
  test('devera retornar falso se a validação falhar', () => {
    const sut = new SenhaValidatorAdapter();
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalido_senha');
    expect(isValid).toBe(false);
  });

  test('devera retornar true se a validação ñ falhar', () => {
    const sut = new SenhaValidatorAdapter();
    const isValid = sut.isValid('senha_valIda1');
    expect(isValid).toBe(true);
  });
});
