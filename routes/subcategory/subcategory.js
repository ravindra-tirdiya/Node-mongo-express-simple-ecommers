const express = require('express');
const subCategoryHandler = require('../../controllers/sabcategory/subCategoryControllers');

const router = express.Router();

router.route('/sub_create_category').post(subCategoryHandler.subCategoryCreate);
router.route('/sub_edit_category').put(subCategoryHandler.subCategoryEdit);  // Use :id for identifying subcategory
router.route('/sub_delete_category').delete(subCategoryHandler.subCategoryDelete); // Same for delete

module.exports = router;
