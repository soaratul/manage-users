const HttpStatusCode = require('./http-status-code');

class BaseError extends Error {
  constructor(name, statusCode, message, isOperational = true) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    description = 'Internal server error',
    isOperational = true
  ) {
    super(name, httpCode, description, isOperational);
  }
}

class BadRequestError extends BaseError {
  constructor(description = 'Bad request') {
    super('BAD_REQUEST', HttpStatusCode.BAD_REQUEST, description);
  }
}

class UnauthorizedError extends BaseError {
  constructor(description = 'Unauthorized request') {
    super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, description);
  }
}

class ForbiddenError extends BaseError {
  constructor(description = 'Forbidden request') {
    super('BAD_REQUEST', HttpStatusCode.FORBIDDEN, description);
  }
}

class NotFoundError extends BaseError {
  constructor(description = 'Not found') {
    super('NOT_FOUND', HttpStatusCode.NOT_FOUND, description);
  }
}

class InternalServerError extends BaseError {
  constructor(description = 'Internal server error') {
    super(
      'INTERNAL_SERVER_ERROR',
      HttpStatusCode.INTERNAL_SERVER,
      description,
      true
    );
  }
}

module.exports = {
  HttpStatusCode,
  BaseError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  APIError
};
