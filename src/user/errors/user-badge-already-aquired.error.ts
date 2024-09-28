import { ValidationError } from '../../common/errors/business.error';
export const USER_BADGE_ALREADY_AQUIRED_ERROR_CODE =
  'USER_BADGE_ALREADY_AQUIRED_ERROR_CODE';

export class UserBadgeAlreadyAquiredError extends ValidationError {
  constructor(details?: unknown) {
    super(
      'You have this badge already',
      USER_BADGE_ALREADY_AQUIRED_ERROR_CODE,
      details,
    );
  }
}
