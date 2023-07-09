const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    description: {
      type:String,
      required:true,
    },
    range: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Items", ItemsSchema);