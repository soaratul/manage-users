const JWT = require('jsonwebtoken');
const { Error } = require('../utils');
const { JWT_CONFIG, DB } = require('../config');
const { getUserByEmail } = require('../utils/user-utils');
const { BadRequestError, ForbiddenError } = Error;

const auth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies)
      throw new ForbiddenError('You must login to perform this action.');

    // Get token from headers
    let token = cookies?.accessToken;
    // If token does not exist then throw error
    if (!token)
      throw new ForbiddenError('You must login to perform this action.');

    // Initialize payload variable with undefined value
    let payload;
    let tokenError;
    // Verify token
    JWT.verify(token, JWT_CONFIG.ACCESS_TOKEN_KEY, (error, data) => {
      // If any error on verifying token then return
      if (error) {
        tokenError = error.name;
        return;
      }
      // If no error on verifying token then update payload variable with data(token payload)
      payload = data;
    });

    // If payload is undefind then throw error
    if (!payload) {
      if (tokenError === 'TokenExpiredError') {
        res.clearCookie('accessToken');
        throw new ForbiddenError('ACCESS_TOKEN_EXPIRED');
      }
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      throw new BadRequestError('The given authorization token is invalid.');
    }

    // Check in user table if user exists based on email and id, getting from token payload
    const isUserExist = await getUserByEmail(payload.email);
    // If user does not exist then throw error
    if (!isUserExist)
      throw new BadRequestError('The given authorization token is invalid.');

    // Add user property in req with user data
    req.currentUser = isUserExist;
    // Execute further codes
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
