const DEFAULT_CURR_PAGE = 1;
const DEFAULT_POSTS_LIMIT = 10;

const SORT_BY = { date: "publishDate", likes: "rating" };
const SORT_ORDER = { ASC: "ASC", DESC: "DESC" };

const LIKE_ENTITY_NAMES = { post: "post", answer: "answer" };

const LIKE_ENTITIES = {
  [LIKE_ENTITY_NAMES.post]: (value) => ({ value, key: "postId", model: "Post" }),
  [LIKE_ENTITY_NAMES.answer]: (value) => ({ value, key: "answerId", model: "Answer" }),
};

module.exports = {
  DEFAULT_CURR_PAGE,
  DEFAULT_POSTS_LIMIT,
  SORT_BY,
  SORT_ORDER,
  LIKE_ENTITIES,
  LIKE_ENTITY_NAMES,
};
