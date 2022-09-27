const { CategoryService } = require("~/services");

const getPostCategories = async (req, res) => {
  const { postId } = req.params;

  const categories = await CategoryService.getCategoriesByPostID(postId);

  res.json(categories);
};

module.exports = { getPostCategories };
