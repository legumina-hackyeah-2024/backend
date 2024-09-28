import { ValidationError } from '../../common/errors/business.error';
export const FRIEND_CAN_NOT_DECIDE_OWN_REQUEST_ERROR_CODE =
  'FRIEND_CAN_NOT_DECIDE_OWN_REQUEST_ERROR_CODE';

export class FriendCannotDecideOwnRequest extends ValidationError {
  constructor() {
    super(
      'You can not decide own request',
      FRIEND_CAN_NOT_DECIDE_OWN_REQUEST_ERROR_CODE,
    );
  }
}
