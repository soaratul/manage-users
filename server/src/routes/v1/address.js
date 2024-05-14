const express = require('express');
const { getAddress } = require('../../controllers/address/controller');

const routers = express.Router();

routers.get('/', getAddress);

module.exports = routers;
