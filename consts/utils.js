const AVATAR_NAME = (id) => {
  return `avatar-${id}.jpeg`;
};

const AVATAR_FILE_PATH = `public/images/users/`;

const RESOURCES = { query: "query", body: "body" };

const ADMIN_TAB_NAME = { name: "Admin Panel" };

module.exports = { AVATAR_NAME, AVATAR_FILE_PATH, RESOURCES, ADMIN_TAB_NAME };
