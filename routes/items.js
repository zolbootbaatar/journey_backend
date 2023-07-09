const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getItems,
  getItem,
  createItems,
  deleteItems,
  updateItems,
  uploadItemsPhoto,
} = require("../controller/items");

// const { getItemsComments } = require("../controller/comments");

const router = express.Router();

//"/api/v1/Itemss"
router
  .route("/")
  .get(getItems)
  .post(createItems);

router
  .route("/:id")
  .get(getItem)
  .delete(deleteItems)
  .put(updateItems);

router
  .route("/:id/upload-photo")
  .put( uploadItemsPhoto);

// router.route("/:id/comments").get(getBookComments);

module.exports = router;
