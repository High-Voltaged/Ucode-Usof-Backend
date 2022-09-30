const { existenceCheck, getOne } = require("~/controllers/factory");
const { Category } = require("~/models");
const { CategoryService, PostService } = require("~/services");

const getCategories = async (req, res) => {
  const categories = await CategoryService.getCategories();

  res.json(categories);
};

const getCategory = getOne(Category);

const getCategoryPosts = async (req, res) => {
  const { id } = req.params;
  const { page, limit } = req.query;

  const categories = await PostService.getPosts(page, limit, { categories: [id] });

  res.json(categories);
};

const getPostCategories = async (req, res) => {
  const { id } = req.params;

  const categories = await CategoryService.getCategoriesByPostID(id);

  res.json(categories);
};

const createCategory = async (req, res) => {
  const data = req.body;

  const category = await CategoryService.createCategory(data);

  res.json(category);
};

const categoryExistenceCheck = existenceCheck(Category);

module.exports = {
  getCategories,
  getCategory,
  getCategoryPosts,
  getPostCategories,
  createCategory,
  categoryExistenceCheck,
};
