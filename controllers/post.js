const { Post } = require("~/models");
const { PostService } = require("~/services");
const { existenceCheck, authorValidation, deleteOne } = require("~/controllers/factory");

const getPosts = async (req, res) => {
  const { page, limit, ...filters } = req.query;
  const posts = await PostService.getPosts(page, limit, filters);

  res.json(posts);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await PostService.getPost(id);

  res.json(post);
};

const createPost = async (req, res) => {
  const { categories, ...data } = req.body;
  const { id: author } = req.user;
  const post = await PostService.createPost({ author, ...data }, categories);

  res.json(post);
};

const updatePost = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await PostService.updatePost(id, data);

  res.sendStatus(204);
};

const deletePost = deleteOne(Post);

const postExistenceCheck = existenceCheck(Post);

const postAuthorValidation = authorValidation(Post);

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  postExistenceCheck,
  postAuthorValidation,
};
