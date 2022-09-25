const { POST_ATTRS } = require("~/consts/query-attrs");
const sequelize = require("~/database");
const { Post, User } = require("~/models");
const CategoryService = require("~/services/category");
const ServerError = require("~/utils/errors");
const { getPageParams, getPageData } = require("~/utils/pagination");
const getFilters = require("~/utils/filtering");

class PostService {
  static async checkIfPostExists(id) {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new ServerError(404, `A post with the ${id} id was not found.`);
    }
  }

  static async checkPostAuthor(postId, authorID) {
    const post = await PostService.getPost(postId);
    if (authorID !== post.dataValues.author) {
      throw new ServerError(401, "You don't have the rights to edit nor remove this post.");
    }
  }

  static async getPosts(page, customLimit, options) {
    const { limit, offset } = getPageParams(page, customLimit);

    const { categories, ...filters } = getFilters(options);

    const include = [
      {
        model: User,
        attributes: [],
        required: true,
      },
    ];

    categories && include.push(categories);

    const posts = await Post.findAndCountAll({
      limit,
      offset,
      distinct: true,
      attributes: POST_ATTRS,
      include,
      where: filters,
      // subQuery: false,
    });

    const pagination = getPageData(posts.count, page, limit);
    return { posts: posts.rows, ...pagination };
  }

  static async getPost(id) {
    const include = [
      {
        model: User,
        attributes: [],
        required: true,
      },
    ];

    return await Post.findByPk(id, {
      attributes: POST_ATTRS,
      include,
    });
  }

  static async createPost(title, content, categories, author) {
    await sequelize.transaction(async (t) => {
      const post = await Post.create(
        {
          title,
          content,
          author,
        },
        { transaction: t },
      );

      await Promise.all(
        categories.map(async (cID) => {
          const category = await CategoryService.getCategory(cID);
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
          const category = await CategoryService.getCategory(cID);
          await post.addCategory(category);
        }),
      );
    });
  }

  static async deletePost(id) {
    await Post.destroy({ where: { id } });
  }
}

module.exports = PostService;
