const { SORT_BY } = require("~/consts/sequelize");
const { STATUS_ENUM, DATE_FORMAT } = require("~/consts/validation");

const Joi = require("joi").extend(require("@joi/date"));

const querySchema = Joi.object().keys({
  page: Joi.number(),
  limit: Joi.number(),

  sort: Joi.string().valid(...Object.keys(SORT_BY)),

  categories: [Joi.array().items(Joi.number()), Joi.number()],
  dateStart: Joi.date().format(DATE_FORMAT).utc(),
  dateEnd: Joi.date().format(DATE_FORMAT).utc(),
  status: Joi.string().valid(...STATUS_ENUM),
});

module.exports = querySchema;
