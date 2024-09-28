import { ValidationError } from '../../common/errors/business.error';
export const USER_DOES_NOT_EXIST_ERROR_CODE = 'USER_NOT_EXISTS_ERROR_CODE';

export class UserNotFoundError extends ValidationError {
  constructor(details?: unknown) {
    super(
      'Entity with provided data does not exists',
      USER_DOES_NOT_EXIST_ERROR_CODE,
      details,
    );
  }
}
