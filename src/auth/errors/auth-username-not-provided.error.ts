import { ValidationError } from '../../common/errors/business.error';

export const AUTH_USERNAME_NOT_PROVIDED_ERROR =
  'AUTH_USERNAME_NOT_PROVIDED_ERROR' as const;

export class AuthUsernameNotProvidedError extends ValidationError {
  constructor() {
    super(
      'While logging first time with google you need to provide username',
      AUTH_USERNAME_NOT_PROVIDED_ERROR,
    );
  }
}
