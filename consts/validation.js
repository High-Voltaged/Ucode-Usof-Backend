const ROLES_ENUM = ["user", "admin"];
const STATUS_ENUM = ["active", "inactive"];
const LIKES_ENUM = ["like", "dislike"];

const NAME_LIMITS = [4, 16];
const TITLE_LIMITS = [3, 100];
const CONTENT_LIMITS = [10, 1000];

const PASSWORD_LIMITS = [8, 20];

const DATE_FORMAT = "YYYY-MM-DD";

const RANGE_ERROR = (limits) => `The length should be in ${limits.join(", ")} range.`;

module.exports = {
  ROLES_ENUM,
  STATUS_ENUM,
  LIKES_ENUM,
  NAME_LIMITS,
  TITLE_LIMITS,
  CONTENT_LIMITS,
  PASSWORD_LIMITS,
  DATE_FORMAT,
  RANGE_ERROR,
};
