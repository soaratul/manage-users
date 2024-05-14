const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const { APP, CORS } = require('./config');
const { isTrustedError, errorHandler } = require('./middlewares');
const { HttpStatusCode, Logger, file } = require('./utils');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sendResponse } = require('./utils/response');

// Use middleware cors
app.use(cors(CORS));

// Use middleware cookie-parser
app.use(cookieParser(APP.COOKIE_SECRET));

// Use middleware body-parser
app.use(bodyParser.json());

app.get('/', (req, res) => {
  sendResponse(res, { message: 'Server is up and running' });
});

// Add routes
app.use(routes);

app.use((req, res, next) => {
  res.status(HttpStatusCode.NOT_FOUND).send({
    error: {
      status: 0,
      statusCode: HttpStatusCode.NOT_FOUND,
      message: 'Not found'
    }
  });
});

app.use(errorHandler.logError);
app.use(errorHandler.handleError);

// Handling errors
app.use((error, req, res, next) => {
  return res.status(HttpStatusCode.INTERNAL_SERVER || 500).send({
    error: {
      status: 0,
      statusCode: HttpStatusCode.INTERNAL_SERVER,
      message: error.message || 'Internal Server Error'
    }
  });
});

process.on('unhandledRejection', (error) => {
  Logger.log(error);
  throw error;
});

process.on('uncaughtException', (error) => {
  if (!isTrustedError(error)) {
    Logger.log(error);
    process.exit(1);
  }
});

app.listen(APP.PORT, async () => {
  console.log(`App listening on port ${APP.PORT}`);
  // create data file with empty array
  await file.createFileIfNotExists('data.json');
});
