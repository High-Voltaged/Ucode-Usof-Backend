const { CATEGORY_ATTRS } = require("~/consts/query-attrs");
const { Category, Post } = require("~/models");
const ServerError = require("~/utils/errors");

class CategoryService {
  static async getCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new ServerError(404, `A category with ${id} id was not found.`);
    }
    return category;
  }

  static async getCategories(options) {
    return await Category.findAll({
      attributes: CATEGORY_ATTRS,
      ...options,
    });
  }

  static async getCategoriesByPostID(postId, options) {
    const categories = await CategoryService.getCategories({
      include: {
        model: Post,
        attributes: [],
        where: { id: postId },
      },
      ...options,
    });

    return categories;
  }
}

module.exports = CategoryService;
