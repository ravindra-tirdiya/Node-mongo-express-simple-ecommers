const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const subCategorySchema = new Schema(
  {
    subCategoryName: {
      type: String,
      default: "",
      required: true,
    },
    subCategoryUrl: {
      type: String,
      default: "",
      require:true
    },
    subCategoryTypeRefrence: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category",
      require:true
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

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
