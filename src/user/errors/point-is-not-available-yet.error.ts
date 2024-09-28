import { ValidationError } from '../../common/errors/business.error';
export const POINT_IS_NOT_AVAILABLE_YET_ERROR_CODE = 'POINT_IS_NOT_AVAILABLE_YET';

export class PointIsNotAvailableYetError extends ValidationError {
  constructor(details?: unknown) {
    super(
      'This point is not available yet',
      POINT_IS_NOT_AVAILABLE_YET_ERROR_CODE,
      details,
    );
  }
}
