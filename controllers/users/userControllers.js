const bcrypt = require("bcrypt");
const jwtUtil = require("../../middleware/jwt");
const dbServices = require("../../utils/dbService");
const User = require("../../model/userModel");
const { registerSchema } = require("../../utils/validation/joiValidation");
const crypto = require("crypto"); 

const authController = {
  
  async register(req, res) {
    try {
      const { username, password, email, mobileNo } = req.body;
      const { error } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const existingUser = await dbServices.findOne(User, { email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const user = await dbServices.create(User, {
        username,
        password,
        email,
        mobileNo,
      });

      res.status(201).json({
        message: "User registered successfully",
        data: {
          user
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await dbServices.findOne(User, { email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email plese enter valid email" });
      }

      const isMatch = await user.isPasswordMatch(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password plese enter valid password" });
      }

      const accessToken = jwtUtil.generateAccessToken(user);
      const refreshToken = jwtUtil.generateRefreshToken(user);

      res.status(200).json({
        message: "Login successful",
        data: {
          user,
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
  
      const user = await dbServices.findOne(User, { email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordLink = {
        code: resetToken,
        expireTime: Date.now() + 3600000, // Token valid for 1 hour
      };
      await user.save();
  
      res.status(200).json({
        message: "Password reset link sent",
        resetToken,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  async resetPassword(req, res) {
    try {
      const { resetToken, newPassword } = req.body;
  
      const user = await dbServices.findOne(User, {
        "resetPasswordLink.code": resetToken,
        "resetPasswordLink.expireTime": { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      user.password = hashedPassword;
      user.resetPasswordLink = undefined;
      await user.save();
  
      res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  async updatePassword(req, res) {
    try {
      const { email, currentPassword, newPassword } = req.body;

      const user = await dbServices.findOne(User, { email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await user.isPasswordMatch(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 8);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },



  async changeEmail(req, res) {
    try {
      const { mobileNo, newEmail } = req.body;

      const user = await dbServices.findOne(User, { mobileNo:mobileNo });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingUser = await dbServices.findOne(User, { email: newEmail });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      user.email = newEmail;
      await user.save();

      res.status(200).json({ message: "Email updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },



  async deleteUser(req, res) {
    try {
      const { userId } = req.body;

      const user = await dbServices.findOne(User, { _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      
      await dbServices.deleteOne(User,{ _id: userId });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = authController;
