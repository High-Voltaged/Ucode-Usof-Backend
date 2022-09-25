const AVATAR_NAME = (id) => {
  return `avatar-${Date.now()}-${id}.jpeg`;
};

const AVATAR_FILE_PATH = `public/images/users/`;

const DEFAULT_CURR_PAGE = 1;
const DEFAULT_POSTS_LIMIT = 5;

const RESOURCES = { query: "query", body: "body" };

module.exports = {
  AVATAR_NAME,
  AVATAR_FILE_PATH,
  DEFAULT_CURR_PAGE,
  DEFAULT_POSTS_LIMIT,
  RESOURCES,
};
