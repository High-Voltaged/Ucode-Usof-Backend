const Joi = require("joi");
const {
  errors: { NULL_BODY_FIELD },
  STATUS_ENUM,
} = require("~/consts/validation");

const createCommentSchema = Joi.object().keys({
  content: Joi.string().required(NULL_BODY_FIELD("content")),
  status: Joi.string().valid(...STATUS_ENUM),
});

const updateCommentSchema = Joi.object().keys({
  status: Joi.string().valid(...STATUS_ENUM),
  // content: Joi.string(),
});

module.exports = { createCommentSchema, updateCommentSchema };
