const upload2 = require("../../middleware/submulter");
const SubCategory = require("../../model/subCategoryModel");
const { subCategorySchemaJoiValidation } = require("../../utils/validation/joiValidation");
const dbService = require("../../utils/dbService");
const Category = require("../../model/categoryModel");

const subCategoryHandler = {
  subCategoryCreate: async (req, res) => {
      try {
        const { subCategoryName, subCategoryUrl, subCategoryTypeRefrence } = req.body;
        const categoryExists = await Category.findOne({ _id: subCategoryTypeRefrence });
        
        if (!categoryExists) {
          return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        const findSubCategoryName = await SubCategory.findOne({ subCategoryName });
        if (findSubCategoryName) {
          return res
            .status(402)
            .json({ message: "Sub Category name already exist" });
        }

        const { error } = subCategorySchemaJoiValidation.validate({
          subCategoryName,
          subCategoryUrl,
          subCategoryTypeRefrence
        });

        if (error) return res.status(400).json({ success: false, error: error.details[0].message });

        const newSubCategory = await dbService.create(SubCategory, {
          subCategoryName,
          subCategoryUrl,
          subCategoryTypeRefrence
        });

        res.status(201).json({ success: true, data: newSubCategory });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
  },

  subCategoryEdit: async (req, res) => {
    try {
      const { id, subCategoryName, subCategoryUrl } = req.body; 
  
      if (!id) {
        return res.status(400).json({ message: "SubCategory ID is required" });
      }
  
      const subCategory = await dbService.findOne(SubCategory, { _id: id });
      if (!subCategory) {
        return res.status(404).json({ message: "SubCategory not found" });
      }
  
      if (subCategoryName) {
        const existingSubCategory = await dbService.findOne(SubCategory, { subCategoryName });
        if (existingSubCategory && existingSubCategory._id.toString() !== id) {
          return res
            .status(400)
            .json({ message: "SubCategory name already exists" });
        }
        subCategory.subCategoryName = subCategoryName;
      }
  
      if (subCategoryUrl) {
        subCategory.subCategoryUrl = subCategoryUrl;
      }
  
      await subCategory.save();
      res.status(200).json({
        message: "SubCategory updated successfully",
        data: { subCategory },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
  

  subCategoryDelete: async (req, res) => {
    try {
      const { id } = req.body;

      const deletedSubCategory = await dbService.deleteOne(SubCategory, { _id: id });

      if (!deletedSubCategory) {
        return res.status(404).json({ success: false, message: "SubCategory not found" });
      }

      res.status(200).json({ success: true, message: "SubCategory deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = subCategoryHandler;
