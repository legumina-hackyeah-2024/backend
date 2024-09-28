import { ValidationError } from '../../common/errors/business.error';
export const HERO_DOES_NOT_EXIST_ERROR_CODE = 'HERO_NOT_EXISTS_ERROR_CODE';

export class HeroNotFoundError extends ValidationError {
  constructor(details?: unknown) {
    super(
      'Entity with provided data does not exists',
      HERO_DOES_NOT_EXIST_ERROR_CODE,
      details,
    );
  }
}
