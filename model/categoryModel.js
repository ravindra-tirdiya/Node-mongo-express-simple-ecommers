const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
    categoryUrl: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeactive: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date },

    updatedAt: { type: Date },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Category = mongoose.model("Category", categorySchema); 
module.exports = Category;
