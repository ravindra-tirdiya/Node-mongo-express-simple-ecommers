const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().min(6).required(),
  mobileNo: Joi.number().min(10),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const categorySchemaJoiValidation = Joi.object({
  categoryName: Joi.string().required().messages({
    "any.required": "Category name is required",
  }),
  categoryUrl: Joi.string().required().messages({
    "any.required": "Category url is required",
  }),
});


const subCategorySchemaJoiValidation = Joi.object({
  subCategoryName: Joi.string()
    .required()
    .empty("")
    .messages({
      "any.required": "Subcategory name is required",
      "string.empty": "Subcategory name cannot be empty",
    }),
    subCategoryUrl: Joi.string()
    .required()
    .empty("")
    .messages({
      "any.required": "Subcategory URL is required",
      "string.empty": "Subcategory URL cannot be empty",
    }),
    subCategoryTypeRefrence: Joi.string()
    .required()
    .empty("")
    .messages({
      "any.required": "Subcategory Type is required",
      "string.empty": "Subcategory Type cannot be empty",
    }),
});


module.exports = { registerSchema, loginSchema, categorySchemaJoiValidation , subCategorySchemaJoiValidation};
