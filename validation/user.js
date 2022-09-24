const Joi = require("joi");
const {
  errors: { NULL_BODY_FIELD },
  PASSWORD_LIMITS,
} = require("~/consts/validation");

const loginSchema = Joi.object().keys({
  login: Joi.string().required(NULL_BODY_FIELD("login")),
  email: Joi.string().email().required(NULL_BODY_FIELD("email")),
  password: Joi.string().required(NULL_BODY_FIELD("password")),
});

const registerSchema = Joi.object().keys({
  login: Joi.string().required(NULL_BODY_FIELD("login")),
  email: Joi.string().email().required(NULL_BODY_FIELD("email")),
  fullName: Joi.string(),
  password: Joi.string().required(NULL_BODY_FIELD("password")).min(PASSWORD_LIMITS[0]).max(PASSWORD_LIMITS[1]),
  passwordConfirm: Joi.string().required(NULL_BODY_FIELD("passwordConfirm")),
});

const updateSchema = Joi.object().keys({
  login: Joi.string(),
  email: Joi.string().email(),
  fullName: Joi.string(),
});

const passwordResetSchema = Joi.object().keys({
  password: Joi.string().required().min(PASSWORD_LIMITS[0]).max(PASSWORD_LIMITS[1]),
});

const sendEmailSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

module.exports = { loginSchema, registerSchema, updateSchema, passwordResetSchema, sendEmailSchema };
