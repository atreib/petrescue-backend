import { BaseError } from './BaseError';

class MissingParameterError extends BaseError {
  constructor(propertyName: String) {
    super(`Parameter ${propertyName} is missing`);
    this.name = this.constructor.name;
  }
}

export { MissingParameterError };
