const Items = require("../models/items");
const path = require("path");
const Category = require("../models/Category");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const items = require("../models/items");

// api/v1/books
exports.getItems = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10000;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Items);

  const Items = await Items.find(req.query, select)
    .populate({
      path: "category",
      select: "name averagePrice",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: Items.length,
    data: Items,
    pagination,
  });
});

exports.getCategoryItems = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Items);

  //req.query, select
  const items = await Items.find(
    { ...req.query, category: req.params.categoryId },
    select
  )
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: Items.length,
    data: items,
    pagination,
  });
});

exports.getItem = asyncHandler(async (req, res, next) => {
  const Items = await Items.findById(req.params.id);

  if (!Items) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  res.status(200).json({
    success: true,
    data: Items,
  });
});

exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.createItems = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    throw new MyError(req.body.category + " ID-тэй категори байхгүй!", 400);
  }

  // req.body.createUser = req.userId;

  const items = await Items.create(req.body);

  res.status(200).json({
    success: true,
    data: items,
  });
});

exports.deleteItems = asyncHandler(async (req, res, next) => {
  const Items = await Items.findById(req.params.id);

  if (!Items) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }


  Items.remove();

  res.status(200).json({
    success: true,
    data: Items
  });
});

exports.updateItems = asyncHandler(async (req, res, next) => {
  const Items = await Items.findById(req.params.id);

  if (!Items) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  for (let attr in req.body) {
    Items[attr] = req.body[attr];
  }

  Items.save();

  res.status(200).json({
    success: true,
    data: Items,
  });
});

// PUT:  api/v1/Items/:id/photo
exports.uploadItemsPhoto = asyncHandler(async (req, res, next) => {
  const Items = await Items.findById(req.params.id);

  if (!Items) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээ.", 400);
  }

  // image upload

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
  }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    Items.photo = file.name;
    items.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
