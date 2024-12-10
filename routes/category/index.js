/**
 * index.js
 * @description :: Index route file for the user platform.
 */

const express = require('express');
const router = express.Router();

// Import and use user-specific routes
router.use('/category', require('./category')); // Authentication routes for login and signup

module.exports = router;
