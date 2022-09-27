const DEFAULT_CURR_PAGE = 1;
const DEFAULT_POSTS_LIMIT = 5;

const SORT_BY = { date: "publishDate", likes: "likesCount" };
const SORT_ORDER = { ASC: "ASC", DESC: "DESC" };

const LIKE_ENTITY_NAMES = { post: "post", comment: "comment" };

const LIKE_ENTITIES = {
  [LIKE_ENTITY_NAMES.post]: (value) => ({ value, key: "postId", model: "Post" }),
  [LIKE_ENTITY_NAMES.comment]: (value) => ({ value, key: "commentId", model: "Comment" }),
};

module.exports = {
  DEFAULT_CURR_PAGE,
  DEFAULT_POSTS_LIMIT,
  SORT_BY,
  SORT_ORDER,
  LIKE_ENTITIES,
  LIKE_ENTITY_NAMES,
};
