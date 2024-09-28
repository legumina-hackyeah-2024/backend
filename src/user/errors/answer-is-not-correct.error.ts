import { ValidationError } from '../../common/errors/business.error';
export const ANSWER_IS_NOT_CORRECT_ERROR_CODE = 'ANSWER_IS_NOT_CORRECT';

export class AnswerIsNotCorrectError extends ValidationError {
  constructor(details?: unknown) {
    super(
      'Answer is not correct',
      ANSWER_IS_NOT_CORRECT_ERROR_CODE,
      details,
    );
  }
}
