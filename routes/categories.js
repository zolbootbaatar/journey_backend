const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categories");

// api/v1/categories/:id/books
const { getCategoryItems } = require("../controller/items");
router.route("/:categoryId/items").get(getCategoryItems);

//"/api/v1/categories"
router
  .route("/")
  .get(getCategories)
  .post(createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put( updateCategory)
  .delete(deleteCategory);

module.exports = router;
