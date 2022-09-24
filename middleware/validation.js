const ServerError = require("~/utils/errors");

const validateSchema = (schema) => {
  return (req, _res, next) => {
    if (!req.body) {
      next(new ServerError(400, "Request body is not defined."));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(new ServerError(400, error));
    }
    next();
  };
};

module.exports = validateSchema;
