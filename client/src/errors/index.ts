import { BaseError } from "./BaseError";
import { HttpStatusCode } from "./HttpStatusCode";

//free to extend the BaseError
export class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = 'internal server error'
  ) {
    super(name, httpCode, isOperational, description);
  }
}

export class HTTP400Error extends BaseError {
  constructor(description = 'bad request') {
    super('NOT FOUND', HttpStatusCode.BAD_REQUEST, true, description);
  }
}
