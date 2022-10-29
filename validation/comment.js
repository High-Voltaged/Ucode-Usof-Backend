const Joi = require("joi");
const { CONTENT_LIMITS } = require("~/consts/validation");

const createCommentSchema = Joi.object().keys({
  content: Joi.string().required().min(CONTENT_LIMITS[0]).max(CONTENT_LIMITS[1]),
});

const updateCommentSchema = Joi.object().keys({
  content: Joi.string().min(CONTENT_LIMITS[0]).max(CONTENT_LIMITS[1]),
});

module.exports = { createCommentSchema, updateCommentSchema };
