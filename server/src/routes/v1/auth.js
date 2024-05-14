const express = require('express');
const authRouters = express.Router();
const {
  loginSchema,
  refreshTokenShema,
  registerSchema
} = require('../../controllers/auth/validation');
const {
  login,
  register,
  refreshToken,
  logout
} = require('../../controllers/auth/controller');
const { yupValidate } = require('../../middlewares');

authRouters.post(
  '/register',
  yupValidate(registerSchema, { abortEarly: false }),
  register
);

authRouters.post('/login', yupValidate(loginSchema), login);

authRouters.post('/logout', logout);

authRouters.post(
  '/refresh-token',
  yupValidate(refreshTokenShema),
  refreshToken
);

module.exports = authRouters;
