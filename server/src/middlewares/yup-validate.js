module.exports = function yupValidate(schema, validateOptions) {
  return async function expressYupMiddleware(req, res, next) {
    try {
      await schema.validate(req, { ...validateOptions, request: req });
      next();
    } catch (error) {
      next(error);
    }
  };
};
