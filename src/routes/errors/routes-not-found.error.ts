import { ValidationError } from '../../common/errors/business.error';
export const ROUTES_DOES_NOT_EXIST_ERROR_CODE = 'ROUTES_NOT_EXISTS_ERROR_CODE';

export class RoutesNotFoundError extends ValidationError {
  constructor(details?: unknown) {
    super(
      'Entity with provided data does not exists',
      ROUTES_DOES_NOT_EXIST_ERROR_CODE,
      details,
    );
  }
}
