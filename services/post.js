const sequelize = require("~/database");
const { Post, User, Category, PostCategories } = require("~/models");
const { POST_ATTRS } = require("~/consts/query-attrs");

const FactoryService = require("~/services/factory");

const { getPageParams, getPageData } = require("~/utils/pagination");
const getFilters = require("~/utils/filtering");
const getSortOptions = require("~/utils/sorting");

const ServerError = require("~/utils/errors");
const { STATUS_ENUM } = require("~/consts/validation");

class PostService {
  static async getPosts(page, customLimit, options) {
    const { limit, offset } = getPageParams(page, customLimit);

    const { sort, ...filters } = options;
    const { category, ...where } = getFilters(filters);
    const { order, group } = getSortOptions(sort);

    const include = [{ model: User, attributes: [], required: true }];

    category && include.push(category);
    category && group.push("categories.id");

    const { rows, count } = await Post.findAndCountAll({
      limit,
      offset,
      distinct: true,
      attributes: POST_ATTRS,
      include,
      where,
      group,
      order,
      subQuery: false,
    });

    const pagination = getPageData(count.length, page, limit);
    return { posts: rows, ...pagination };
  }

  static async checkIfInactive(id) {
    const post = await FactoryService.getOne(Post, id);

    if (post.status === STATUS_ENUM[1]) {
      throw new ServerError(403, "This post is inactive.");
    }
  }

  static async getPost(id) {
    const include = [{ model: User, attributes: [], required: true }];

    return await Post.findByPk(id, {
      attributes: POST_ATTRS,
      include,
    });
  }

  static async removePostCategories(categories, post, t) {
    await Promise.all(
      categories.map(async (cID) => {
        const category = await FactoryService.existenceCheck(Category, cID);
        await post.addCategory(category, { transaction: t });
      }),
    );
  }

  static async createPost(data, categories) {
    await sequelize.transaction(async (t) => {
      const post = await Post.create(data, { transaction: t });

      await PostService.removePostCategories(categories, post, t);
    });
  }

  static async updatePost(postId, data) {
    await sequelize.transaction(async (t) => {
      const post = await PostService.getPost(postId);

      const { categories, ...dataToUpdate } = data;

      await post.update(dataToUpdate, { transaction: t });

      if (!categories || !categories.length) {
        return;
      }

      await post.update({ categories: [] });
      await PostCategories.destroy({ where: { postId } });

      await PostService.removePostCategories(categories, post, t);
    });
  }
}

module.exports = PostService;
