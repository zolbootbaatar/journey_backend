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
    land_photo_1: {
      type: String,
      default: "no-photo.jpg",
    },
    land_photo_2: {
      type: String,
      default: "no-photo.jpg",
    },
    land_photo_3: {
      type: String,
      default: "no-photo.jpg",
    },
    city: {
      type: String,
      default: "no-photo.jpg",
    },
    nearby_place_1: {
      type: String
    },
    nearby_place_2: {
      type: String
    },
    type: {
      type: String,
    },
    contractPhone: {
      type: String,
    },
    contractEmail: {
      type: String,
    },
    appName: {
      type: String,
    },
    hours: {
      type: String,
    },
    plane: {
      type: String,
    },
    bus: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    description: {
      type:String,
      required:true,
    },
    price: {
      type: String, 
    },
    downloads: {
      type: String,
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
