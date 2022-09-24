const { Sequelize } = require("sequelize");
const { POST_ATTRS } = require("~/consts/query-attrs");
const { LIKES_ENUM, STATUS_ENUM } = require("~/consts/validation");
const { Post, User, Like } = require("~/models");
const ServerError = require("~/utils/errors");
const CategoryService = require("./category");

class PostService {
  static async checkIfPostExists(id) {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new ServerError(404, `A post with the ${id} id was not found.`);
    }
  }

  static async checkPostAuthor(postId, authorID) {
    const post = await PostService.getPost(postId);
    if (authorID !== post.dataValues.userId) {
      throw new ServerError(401, "You don't have the rights to edit nor remove this post.");
    }
  }

  static async getPosts() {
    const likesCount = [Sequelize.literal("COUNT(likes.id)"), "likesCount"];
    const posts = await Post.findAll({
      attributes: [...POST_ATTRS, likesCount],
      include: [
        {
          model: User,
          attributes: [],
          required: true,
        },
        {
          model: Like,
          where: { type: LIKES_ENUM[0] },
          attributes: [],
          required: false,
        },
      ],
      where: { status: STATUS_ENUM[0] },
      group: ["id"],
      order: [["likesCount", "DESC"]],
    });

    return posts;
  }

  static async getPost(id) {
    const post = await Post.findByPk(id, {
      attributes: POST_ATTRS,
      include: [
        {
          model: User,
          attributes: [],
          required: true,
        },
      ],
    });
    return post;
  }

  static async createPost(title, content, categories, author) {
    const post = await Post.create({
      title,
      content,
      author,
    });

    await Promise.all(
      categories.map(async (cID) => {
        const category = await CategoryService.getCategory(cID);
        post.addCategory(category);
      }),
    );
  }

  static async updatePost(postId, title, content, categories) {
    const post = await PostService.getPost(postId);

    await post.update({
      title,
      content,
    });

    const postCategories = await CategoryService.getCategoriesByPostID(postId);
    const postcategoryIds = postCategories.map((c) => c.id);
    await Promise.all(
      categories.map(async (cID) => {
        if (postcategoryIds.includes(cID)) {
          return;
        }
        const category = await CategoryService.getCategory(cID);
        post.addCategory(category);
      }),
    );
  }

  static async deletePost(id) {
    await Post.destroy({ where: { id } });
  }
}

module.exports = PostService;
