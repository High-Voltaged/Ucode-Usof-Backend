const Joi = require("joi");
const {
  errors: { NULL_BODY_FIELD },
} = require("~/consts/validation");

const createPostSchema = Joi.object().keys({
  title: Joi.string().required(NULL_BODY_FIELD("title")),
  content: Joi.string().required(NULL_BODY_FIELD("content")),
  categories: Joi.array()
    .required(NULL_BODY_FIELD("categories"))
    .items(Joi.number().required(NULL_BODY_FIELD("category id"))),
});

const updatePostSchema = Joi.object().keys({
  title: Joi.string(),
  content: Joi.string(),
  categories: Joi.array().items(Joi.number()),
});

module.exports = { createPostSchema, updatePostSchema };
