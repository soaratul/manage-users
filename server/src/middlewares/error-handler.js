const { Error, Logger, response } = require('../utils');
const Yup = require('yup');

const { HttpStatusCode, BaseError } = Error;
const { sendErrorResponse } = response;

function logError(error, req, res, next) {
  // Logger.error(
  //   'Error message from the centralized error-handling component',
  //   error
  // );
  next(error);
}

function handleError(error, req, res, next) {
  if (error.inner && error.inner.length) {
    const yupErrors = error.inner.map((yupError) => {
      return {
        path: yupError.path.replace('body.', ''),
        message: yupError.message
      };
    });
    return sendErrorResponse(res, HttpStatusCode.BAD_REQUEST, yupErrors, true);
  }
  const { statusCode, message } = error;
  sendErrorResponse(res, statusCode, message);
}

function isTrustedError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = { logError, handleError, isTrustedError };
