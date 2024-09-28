import { ValidationError } from '../../common/errors/business.error';

export const GOOGLE_NO_USER_ERROR = 'GOOGLE_NO_USER_ERROR' as const;

export class GoogleNoUserError extends ValidationError {
  constructor() {
    super('Google did not return any user', GOOGLE_NO_USER_ERROR);
  }
}
