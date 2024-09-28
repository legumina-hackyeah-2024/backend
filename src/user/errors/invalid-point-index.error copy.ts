import { ValidationError } from '../../common/errors/business.error';
export const INVALID_POINT_INDEX_ERROR_CODE = 'INVALID_POINT_INDEX';

export class InvalidPointIndexError extends ValidationError {
  constructor(details?: unknown) {
    super(
      'Invalid point index',
      INVALID_POINT_INDEX_ERROR_CODE,
      details,
    );
  }
}
