const ROLES_ENUM = ["user", "admin"];
const STATUS_ENUM = ["active", "inactive"];
const LIKES_ENUM = ["like", "dislike"];

const NAME_LIMITS = [4, 16];

const PASSWORD_LIMITS = [8, 20];

const DATE_FORMAT = "YYYY-MM-DD";

const errors = {
  NULL_BODY_FIELD: (fieldName) => `The field ${fieldName} is not defined in the request body.`,
};

module.exports = { ROLES_ENUM, STATUS_ENUM, NAME_LIMITS, LIKES_ENUM, PASSWORD_LIMITS, DATE_FORMAT, errors };
