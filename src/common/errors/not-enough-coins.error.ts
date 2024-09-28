import { ValidationError } from './business.error';

export const NOT_ENOUGH_COINS_ERROR_CODE = 'NOT_ENOUGH_COINS_ERROR_CODE' as const;

export class NotEnoughCoinsError extends ValidationError {
  constructor(coins: number) {
    super(`Cannot perform action, not enough coins [yourCoins=${coins}]`, NOT_ENOUGH_COINS_ERROR_CODE);
  }
}
