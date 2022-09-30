const Joi = require("joi");

const createCategorySchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string(),
});

module.exports = { createCategorySchema };
