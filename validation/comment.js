const Joi = require("joi");
const {
  errors: { NULL_BODY_FIELD },
} = require("~/consts/validation");

const createCommentSchema = Joi.object().keys({
  content: Joi.string().required(NULL_BODY_FIELD("content")),
});

const updateCommentSchema = Joi.object().keys({
  content: Joi.string(),
});

module.exports = { createCommentSchema, updateCommentSchema };
