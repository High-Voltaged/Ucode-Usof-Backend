const Joi = require("joi");
const { LIKES_ENUM } = require("~/consts/validation");

const createLikeSchema = Joi.object().keys({
  type: Joi.string()
    .valid(...LIKES_ENUM)
    .required(),
});

module.exports = { createLikeSchema };
