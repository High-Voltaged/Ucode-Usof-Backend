const ServerError = require("~/utils/errors");

class FactoryService {
  static async getOne(Model, id) {
    return await Model.findByPk(id);
  }

  static async createOne(Model, data) {
    return await Model.create(data);
  }

  static async updateOne(Model, id, data) {
    await Model.update(data, { where: { id } });
  }

  static async deleteOne(Model, id) {
    await Model.destroy({ where: { id } });
  }

  static async existenceCheck(Model, id) {
    const entity = await Model.findByPk(id);
    if (!entity) {
      throw new ServerError(404, `A ${Model.name} entity with the ${id} id was not found.`);
    }
    return entity;
  }

  static async authorValidation(Model, id, author) {
    const entity = await Model.findOne({ where: { id } });
    if (author !== entity.dataValues.author) {
      throw new ServerError(401, `You don't have the rights to edit nor remove this ${Model.name} entity.`);
    }
    return entity;
  }
}

module.exports = FactoryService;
