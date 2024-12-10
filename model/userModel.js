/**
 * user.js
 * @description :: model of a database collection user
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const schema = new Schema(
  {
    username: { type: String },

    password: { type: String },

    email: { type: String },

    mobileNo: { type: String },

    superAdmin : { type : Boolean},

    isActive: { type: Boolean },

    isDeleted: { type: Boolean },

    createdAt: { type: Date },

    updatedAt: { type: Date },

    resetPasswordLink: {
      code: String,
      expireTime: Date,
    },

    loginRetryLimit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
schema.pre("save", async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  if (this.email.includes("@gohash.com")) {
    this.superAdmin = true;
  } else {
    this.superAdmin = false;
  }  
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

schema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", schema);
module.exports = User;
