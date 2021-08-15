import { BaseError } from './BaseError';

class InternalServerError extends BaseError {
  constructor(error?: Error) {
    super(`Internal server error`);
    this.name = this.constructor.name;
    this.stack = error?.stack;
  }
}

export { InternalServerError };
