const express = require('express');
const router = express.Router();

router.use('/sub_category', require('./subcategory')); // Ensure the path is correct

module.exports = router;
