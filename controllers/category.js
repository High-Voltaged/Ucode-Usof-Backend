const { CategoryService } = require("~/services");

const getPostCategories = async (req, res) => {
  const { id } = req.params;

  const categories = await CategoryService.getCategoriesByPostID(id);

  res.json(categories);
};

module.exports = { getPostCategories };
