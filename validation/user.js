const Joi = require("joi");
const { PASSWORD_LIMITS, NAME_LIMITS } = require("~/consts/validation");

const loginSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object().keys({
  login: Joi.string().required().min(NAME_LIMITS[0]).max(NAME_LIMITS[1]),
  email: Joi.string().email().required(),
  fullName: Joi.string().min(NAME_LIMITS[0]).max(NAME_LIMITS[1]),
  password: Joi.string().required().min(PASSWORD_LIMITS[0]).max(PASSWORD_LIMITS[1]),
  passwordConfirm: Joi.string().required(),
});

const updateSchema = Joi.object().keys({
  login: Joi.string().min(NAME_LIMITS[0]).max(NAME_LIMITS[1]),
  email: Joi.string().email(),
  fullName: Joi.string().min(NAME_LIMITS[0]).max(NAME_LIMITS[1]),
});

const passwordResetSchema = Joi.object().keys({
  password: Joi.string().required().min(PASSWORD_LIMITS[0]).max(PASSWORD_LIMITS[1]),
});

const sendEmailSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

module.exports = { loginSchema, registerSchema, updateSchema, passwordResetSchema, sendEmailSchema };
