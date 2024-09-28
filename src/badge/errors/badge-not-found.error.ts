import { ValidationError } from '../../common/errors/business.error';
export const BADGE_DOES_NOT_EXIST_ERROR_CODE = 'BADGE_NOT_EXISTS_ERROR_CODE';

export class BadgeNotFoundError extends ValidationError {
  constructor(details?: unknown) {
    super(
      'Entity with provided data does not exists',
      BADGE_DOES_NOT_EXIST_ERROR_CODE,
      details,
    );
  }
}
