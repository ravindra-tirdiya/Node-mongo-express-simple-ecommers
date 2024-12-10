const Category = require("../../model/categoryModel");
const upload = require("../../middleware/multer");
const { categorySchemaJoiValidation } = require("../../utils/validation/joiValidation");
const dbService = require("../../utils/dbService");

const categoryHandler = {
  categoryCreate: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        const { categoryName, categoryUrl } = req.body;

        const findCategoryName = await Category.findOne({ categoryName });
        if (findCategoryName) {
          return res
            .status(402)
            .json({ message: "Category name already exist" });
        }
        const { error } = categorySchemaJoiValidation.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }

        let formatUrl = categoryUrl.trim().toLowerCase();
        formatUrl = formatUrl.replace(/[-_@]+/g, "_");
        formatUrl = formatUrl.replace(/[^a-z0-9]/gi, "_");
        formatUrl = formatUrl.replace(/_+/g, "_");
        formatUrl = formatUrl.replace(/^_|_$/g, "");

        const categoryImage = req.file;
        if (!categoryImage) {
          return res.status(400).json({ message: "Please upload an image" });
        }

        const categoryNameCapitalized =
          categoryName.charAt(0).toUpperCase() +
          categoryName.slice(1).toLowerCase();

        const categoryData = {
          categoryName: categoryNameCapitalized,
          categoryImage: categoryImage.filename,
          categoryUrl: formatUrl,
        };

        const categoryCreate = await dbService.create(Category, categoryData);
        res.status(200).json({
          message: "Category created successfully",
          data: {
            categoryCreate,
          },
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
      }
    });
  },

  categoryEdit: async (req, res) => {
    try {
      const { _id, categoryName, categoryUrl } = req.body;

      const category = await Category.findById(_id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      if (categoryName) {
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory && existingCategory._id.toString() !== _id) {
          return res
            .status(400)
            .json({ message: "Category name already exists" });
        }
        category.categoryName = categoryName;
      }

      if (categoryUrl) {
        let formatUrl = categoryUrl.trim().toLowerCase();
        formatUrl = formatUrl.replace(/[-_@]+/g, "_");
        formatUrl = formatUrl.replace(/[^a-z0-9.]/gi, "_");
        formatUrl = formatUrl.replace(/_+/g, "_");
        formatUrl = formatUrl.replace(/^_|_$/g, ".");
        category.categoryUrl = formatUrl;
      }

      await category.save();
      res
        .status(200)
        .json({ message: "Category updated successfully", data: { category } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  categoryActive: async (req, res) => {
    try {
      const { _id } = req.body;

      const category = await Category.findById(_id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Toggle isActive
      category.isActive = !category.isActive;
      await category.save();

      res.status(200).json({
        message: "Category activation status updated",
        data: { category },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  categoryDeactive: async (req, res) => {
    try {
      const { _id } = req.body;

      const category = await Category.findById(_id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Toggle isDeactive
      category.isDeactive = !category.isDeactive;
      await category.save();

      res.status(200).json({
        message: "Category deactivation status updated",
        data: { category },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  categoryDelete: async (req, res) => {
    try {
      const { _id } = req.body;

      const category = await Category.findById(_id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await Category.findOneAndDelete(category);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  AllCategoryList: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ data: { categories } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = categoryHandler;
