const Joi = require("joi");
const { STATUS_ENUM, CONTENT_LIMITS } = require("~/consts/validation");

const createAnswerSchema = Joi.object().keys({
  content: Joi.string().required().min(CONTENT_LIMITS[0]).max(CONTENT_LIMITS[1]),
  status: Joi.string().valid(...STATUS_ENUM),
});

const updateAnswerSchema = Joi.object().keys({
  status: Joi.string().valid(...STATUS_ENUM),
  content: Joi.string().min(CONTENT_LIMITS[0]).max(CONTENT_LIMITS[1]),
});

module.exports = { createAnswerSchema, updateAnswerSchema };
