const { RESOURCES } = require("~/consts/utils");
const ServerError = require("~/utils/errors");

const validate = (schema, resourceName = RESOURCES.body) => {
  return (req, _res, next) => {
    if (!req[resourceName]) {
      next(new ServerError(400, "Request body is not defined."));
    }

    const { error } = schema.validate(req[resourceName]);
    if (error) {
      next(new ServerError(400, error));
    }
    next();
  };
};

module.exports = validate;
