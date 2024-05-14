const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const {
  Error: { BadRequestError },
  response: { sendResponse },
  HttpStatusCode
} = require('../../utils');
const { JWT_CONFIG, COOKIE, APP } = require('../../config');
const { writeUserToFile, getUserByEmail } = require('../../utils/user-utils');

const register = async (req, res, next) => {
  const inputData = req.body;
  try {
    const user = {
      id: uuid(),
      first_name: inputData.first_name,
      last_name: inputData.last_name,
      email: inputData.email,
      password: inputData.password,
      preferd_payment_method: inputData.preferd_payment_method,
      address_line1: inputData.address_line1,
      address_line2: inputData.address_line2,
      state: inputData.state,
      city: inputData.city,
      pin_code: inputData.pin_code
    };

    const salt = await bcrypt.genSalt(APP.PASSWORD_SALT_ROUND);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    await writeUserToFile(user);

    return doLogin(res, user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return next(
        new BadRequestError(
          `There is already an user exists with email ${inputData.email}`
        )
      );
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const loginData = req.body;
    const user = await getUserByEmail(loginData.email);
    if (!user)
      throw new BadRequestError(
        `User with email ${loginData.email} has not found.`
      );

    const isValidPassword = await bcrypt.compare(
      loginData.password,
      user.password
    );

    if (!isValidPassword) {
      throw new BadRequestError(`Either email or password is incorrect.`);
    }
    return doLogin(res, user);
  } catch (error) {
    next(error);
  }
};

const doLogin = async (res, user) => {
  const payload = getTokenPayload(user);

  const access_token = getToken(payload);
  const refresh_token = getToken(payload, 'refresh');

  res.cookie('accessToken', access_token, COOKIE);
  res.cookie('refreshToken', refresh_token, COOKIE);

  return sendResponse(res);
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    sendResponse(res, {}, HttpStatusCode.OK, 'You loged out successfully.');
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const inputData = req.cookies;
    // Verify token;
    let payload;
    JWT.verify(
      inputData.refreshToken,
      JWT_CONFIG.REFRESH_TOKEN_KEY,
      (error, data) => {
        // If any error on verifying token then return
        if (error) return;
        // If no error on verifying token then update payload variable with data(token payload)
        payload = data;
      }
    );
    console.log('payloadpayloadpayloadpayload', payload);
    // If payload is undefind then throw error
    if (!payload)
      throw new BadRequestError(`The given refresh token is invalid/expired.`);

    const user = await getUserByEmail(payload.email);
    if (!user) throw new BadRequestError(`Invalid refresh token.`);

    //New access token for few more minutes
    const tokenPayload = getTokenPayload(user);
    const access_token = getToken(tokenPayload);
    const refresh_token = getToken(tokenPayload, 'refresh');

    res.cookie('accessToken', access_token, COOKIE);
    res.cookie('refreshToken', refresh_token, COOKIE);

    sendResponse(res);
  } catch (error) {
    next(error);
  }
};

const getToken = (payload, type = 'access') => {
  if (type === 'access')
    return JWT.sign(payload, JWT_CONFIG.ACCESS_TOKEN_KEY, {
      expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN
    });

  return JWT.sign(payload, JWT_CONFIG.REFRESH_TOKEN_KEY, {
    expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRES_IN
  });
};

const getTokenPayload = (user) => {
  return {
    id: user.id,
    email: user.email
  };
};

module.exports = { register, login, refreshToken, logout };
