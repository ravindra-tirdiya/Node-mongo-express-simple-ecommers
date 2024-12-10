const mongoose = require("mongoose");
const User = require("../model/userModel");
const dbServices = require("../utils/dbService");

const seedData = async () => {
  const superAdminData = {
    username: "Super-Admin",
    email: "superadmin@gohash.com",
    password: "123456789",
    isDeleted: false,
    isActive: true,
  };
  try {
     await dbServices.create(User, superAdminData);
    console.log("Database seeding completed 🍺");
  } catch (error) {    
    console.error("Error seeding database:", error);
  }
};

module.exports = seedData;
