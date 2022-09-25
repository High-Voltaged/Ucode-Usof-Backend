const DEFAULT_CURR_PAGE = 1;
const DEFAULT_POSTS_LIMIT = 5;

const SORT_BY = { date: "publishDate", likes: "likesCount" };
const SORT_ORDER = { ASC: "ASC", DESC: "DESC" };

const LIKE_ENTITIES = {
  POST: (value) => ({ value, key: "postId", model: "Post" }),
  COMMENT: (value) => ({ value, key: "commentId", model: "Comment" }),
};

module.exports = {
  DEFAULT_CURR_PAGE,
  DEFAULT_POSTS_LIMIT,
  SORT_BY,
  SORT_ORDER,
  LIKE_ENTITIES,
};
