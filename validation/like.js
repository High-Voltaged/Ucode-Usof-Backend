const Joi = require("joi");
const {
  errors: { NULL_BODY_FIELD },
  LIKES_ENUM,
} = require("~/consts/validation");

const createLikeSchema = Joi.object().keys({
  type: Joi.string()
    .valid(...LIKES_ENUM)
    .required(NULL_BODY_FIELD("type")),
});

module.exports = { createLikeSchema };
