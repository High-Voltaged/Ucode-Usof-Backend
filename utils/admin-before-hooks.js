const { ValidationError } = require("adminjs");
const {
  LIKE_ENTITIES,
  LIKE_ENTITY_NAMES: { post, comment },
} = require("~/consts/sequelize");
const { FactoryService, LikeService } = require("~/services");

const beforeEdit =
  (...excludedFields) =>
  async (request, context) => {
    const { payload = {}, method } = request;
    const errors = {};

    if (method !== "post") {
      return request;
    }

    const model = context.record.resource.SequelizeModel;
    const entity = await FactoryService.getOne(model, payload.id);

    for (const field of excludedFields) {
      const fieldValue = entity.dataValues[field];
      const entityField = !fieldValue ? fieldValue : String(fieldValue);

      if (entityField !== payload[field]) {
        errors[field] = { message: `The field is not editable.` };
      }
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  };

const beforeLikeCreate = async (request, _context) => {
  const { payload = {}, method } = request;

  if (method !== "post") {
    return request;
  }

  const errors = {};

  const { postId, commentId, author } = payload;
  if (postId && commentId) {
    errors.postId = { message: `You can create a like to only one entity.` };
    throw new ValidationError(errors);
  }

  const entityName = (postId && post) || (commentId && comment) || comment;
  const entityId = postId || commentId;
  if (!entityId) {
    errors.postId = { message: `You need to select a post id or a comment id.` };
    throw new ValidationError(errors);
  }

  const entity = LIKE_ENTITIES[entityName](entityId);

  const like = await LikeService.getLike(author, entity);
  if (like) {
    errors.author = { message: "You can not like/dislike more than once." };
    throw new ValidationError(errors);
  }

  return request;
};

module.exports = { beforeEdit, beforeLikeCreate };
