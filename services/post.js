const sequelize = require("~/database");
const { Post, User, Category } = require("~/models");
const { POST_ATTRS } = require("~/consts/query-attrs");

const CategoryService = require("~/services/category");
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
    const { categories, ...where } = getFilters(filters);
    const { order, include: likes, attrs, group } = getSortOptions(sort);

    const include = [{ model: User, attributes: [], required: true }];

    categories && include.push(categories);
    likes && include.push(likes);

    const posts = await Post.findAndCountAll({
      limit,
      offset,
      distinct: true,
      attributes: [...POST_ATTRS, ...attrs],
      include,
      where,
      group,
      order,
      subQuery: false,
    });

    const pagination = getPageData(posts.count.length, page, limit);
    return { posts: posts.rows, ...pagination };
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

  static async createPost(data, categories) {
    await sequelize.transaction(async (t) => {
      const post = await Post.create(data, { transaction: t });

      await Promise.all(
        categories.map(async (cID) => {
          const category = await FactoryService.existenceCheck(Category, cID);
          await post.addCategory(category, { transaction: t });
        }),
      );
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

      const postCategories = await CategoryService.getCategoriesByPostID(postId, { transaction: t });
      const postCategoryIds = postCategories.map((c) => c.id);
      await Promise.all(
        categories.map(async (cID) => {
          if (postCategoryIds.includes(cID)) {
            return;
          }
          const category = await FactoryService.getOne(Category, cID);
          await post.addCategory(category);
        }),
      );
    });
  }
}

module.exports = PostService;
