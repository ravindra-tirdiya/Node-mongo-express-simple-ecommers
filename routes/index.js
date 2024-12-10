/**
 * index.js
 * @description :: index route of platforms
 */

const express = require('express');
const router =  express.Router();

router.use(require('./users/index')); 
router.use(require('./category/index'));
router.use(require('./subcategory/index'))

module.exports = router;