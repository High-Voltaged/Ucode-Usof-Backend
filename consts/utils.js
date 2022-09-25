const AVATAR_NAME = (id) => {
  return `avatar-${Date.now()}-${id}.jpeg`;
};

const AVATAR_FILE_PATH = `public/images/users/`;

const RESOURCES = { query: "query", body: "body" };

module.exports = { AVATAR_NAME, AVATAR_FILE_PATH, RESOURCES };
