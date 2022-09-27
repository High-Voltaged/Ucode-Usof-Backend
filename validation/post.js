const Joi = require("joi");
const { CONTENT_LIMITS, TITLE_LIMITS } = require("~/consts/validation");

const createPostSchema = Joi.object().keys({
  title: Joi.string().required().min(TITLE_LIMITS[0]).max(TITLE_LIMITS[1]),
  content: Joi.string().required().min(CONTENT_LIMITS[0]).max(CONTENT_LIMITS[1]),
  categories: Joi.array().required().items(Joi.number().required()),
});

const updatePostSchema = Joi.object().keys({
  title: Joi.string().min(TITLE_LIMITS[0]).max(TITLE_LIMITS[1]),
  content: Joi.string().min(CONTENT_LIMITS[0]).max(CONTENT_LIMITS[1]),
  categories: Joi.array().items(Joi.number()),
});

module.exports = { createPostSchema, updatePostSchema };
