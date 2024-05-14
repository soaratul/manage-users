module.exports = Object.freeze({
  ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT),
  PASSWORD_SALT_ROUND: parseInt(process.env.PASSWORD_SALT_ROUND),
  MAX_PAGE_LIMIT: parseInt(process.env.MAX_PAGE_LIMIT),
  COOKIE_SECRET: process.env.COOKIE_SECRET
});
