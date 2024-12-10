const express = require('express');
const categoryHandler = require('../../controllers/category/categoryControllers');

const router = express.Router();

router.route('/create_category').post(categoryHandler.categoryCreate);
router.route('/edit_category').put(categoryHandler.categoryEdit);
router.route('/activate_category').put(categoryHandler.categoryActive);
router.route('/deactive_category').put(categoryHandler.categoryDeactive);
router.route('/delete_category').delete(categoryHandler.categoryDelete);
router.route('/all_category_list').get(categoryHandler.AllCategoryList);

module.exports = router;