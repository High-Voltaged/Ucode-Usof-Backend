const { CATEGORY_ATTRS, POST_ATTRS } = require("~/consts/query-attrs");
const { Category, Post, User } = require("~/models");
const ServerError = require("~/utils/errors");

class CategoryService {
  static async getCategory(categoryId) {
    const category = await Category.findByPk(categoryId, { attributes: CATEGORY_ATTRS });
    if (!category) {
      throw new ServerError(404, `A category with ${categoryId} id was not found.`);
    }
    return category;
  }

  static async getCategories(options) {
    return await Category.findAll({
      attributes: CATEGORY_ATTRS,
      ...options,
    });
  }

  static async getCategoryPosts(categoryId) {
    const categories = await Post.findAll({
      attributes: POST_ATTRS,
      include: [
        {
          model: Category,
          attributes: [],
          where: { id: categoryId },
        },
        {
          model: User,
          attributes: [],
          required: true,
        },
      ],
    });
    return categories;
  }

  static async getCategoriesByPostID(postId, options) {
    const categories = await CategoryService.getCategories({
      include: { model: Post, attributes: [], where: { id: postId } },
      ...options,
    });

    return categories;
  }

  static async createCategory(data) {
    const { title } = data;
    const category = await Category.findOne({ where: { title } });
    if (category) {
      throw new ServerError(400, "A category with this title already exists.");
    }

    await Category.create(data);
  }
}

module.exports = CategoryService;
