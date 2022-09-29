const { ValidationError } = require("adminjs");
const { FactoryService } = require("~/services");

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

module.exports = beforeEdit;
