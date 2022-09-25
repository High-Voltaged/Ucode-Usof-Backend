const { STATUS_ENUM } = require("~/consts/validation");

const Joi = require("joi").extend(require("@joi/date"));

const querySchema = Joi.object().keys({
  page: Joi.number(),
  limit: Joi.number(),
  categories: [Joi.array().items(Joi.number()), Joi.number()],
  dateStart: Joi.date().format("YYYY-MM-DD").utc(),
  dateEnd: Joi.date().format("YYYY-MM-DD").utc(),
  status: Joi.string().valid(...STATUS_ENUM),
});

module.exports = querySchema;
