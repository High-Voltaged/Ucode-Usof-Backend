const PostService = require("~/services/post");

const getPosts = async (_req, res) => {
  const posts = await PostService.getPosts();

  res.json(posts);
};

const getPost = async (req, res) => {
  const { postId } = req.params;
  const post = await PostService.getPost(postId);

  res.json(post);
};

const createPost = async (req, res) => {
  const { title, content, categories } = req.body;
  const { id } = req.user;
  const post = await PostService.createPost(title, content, categories, id);

  res.json(post);
};

const updatePost = async (req, res) => {
  const { title, content, categories } = req.body;
  const { postId } = req.params;
  await PostService.updatePost(postId, title, content, categories);

  res.sendStatus(204);
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  await PostService.deletePost(postId);

  res.sendStatus(204);
};

const postExistenceCheck = async (req, _res, next) => {
  const { postId } = req.params;

  await PostService.checkIfPostExists(postId);

  next();
};

const postAuthorValidation = async (req, _res, next) => {
  const { postId } = req.params;
  const { id } = req.user;

  await PostService.checkPostAuthor(postId, id);

  next();
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  postExistenceCheck,
  postAuthorValidation,
};
