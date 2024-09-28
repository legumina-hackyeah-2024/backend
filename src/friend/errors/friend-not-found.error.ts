import { ValidationError } from '../../common/errors/business.error';
export const FRIEND_DOES_NOT_EXIST_ERROR_CODE = 'FRIEND_NOT_EXISTS_ERROR_CODE';

export class FriendNotFoundError extends ValidationError {
  constructor(details?: unknown) {
    super(
      'Entity with provided data does not exists',
      FRIEND_DOES_NOT_EXIST_ERROR_CODE,
      details,
    );
  }
}
