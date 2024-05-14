const express = require('express');
const { sendResponse } = require('../../utils/response');

const routers = express.Router();

routers.get('/', (req, res) => {
  return sendResponse(res, {});
});

module.exports = routers;
