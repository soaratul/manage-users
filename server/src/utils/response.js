const { HttpStatusCode } = require('./Error');

function sendResponse(
  res,
  data = {},
  statusCode = HttpStatusCode.OK,
  message = 'Ok'
) {
  return res.status(statusCode).json({
    status: 'SUCCESS',
    statusCode,
    message,
    data
  });
}

function sendErrorResponse(
  res,
  statusCode = HttpStatusCode.BAD_REQUEST,
  message = 'Bad request',
  multipleErrors = false
) {
  const error = {
    status: 'FAILURE',
    statusCode,
    message: 'Bad request'
  };
  if (multipleErrors) {
    error.error = { errors: message };
    error.message = 'Bad request';
  } else {
    error.error = {
      message
    };
  }
  return res.status(statusCode).json({
    ...error
  });
}

module.exports = { sendResponse, sendErrorResponse };
