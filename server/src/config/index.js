require('dotenv').config();

const APP = require('./app');
const COOKIE = require('./cookie');
const CORS = require('./cors');
const DB = require('./db');
const JWT_CONFIG = require('./jwt-config');

module.exports = { APP, COOKIE, CORS, DB, JWT_CONFIG };
