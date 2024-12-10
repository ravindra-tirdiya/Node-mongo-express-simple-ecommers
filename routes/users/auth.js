const express = require('express');
const router = express.Router();
const authController = require("../../controllers/users/userControllers");

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/reset-password').post(authController.resetPassword);

// router.route('/update-password').post(authController.updatePassword);
// router.route('/change-email').post(authController.changeEmail);
// router.route('/delete-user').post(authController.deleteUser);  


module.exports = router;
