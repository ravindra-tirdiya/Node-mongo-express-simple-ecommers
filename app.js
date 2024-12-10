/**
 * app.js
 * Use `app.js` to run your app.
 * To start the server, run: `node app.js`.
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
global.__basedir = __dirname;
const connectDB = require("./config/db");

const app = express();
const corsOptions = { origin: process.env.ALLOW_ORIGIN };
app.use(cors(corsOptions));

//all routes
const routes = require("./routes");
const seedData = require("./seeders");
const User = require("./model/userModel");
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.get("/", (req, res) => {
  res.render("index");
});

connectDB()
  .then(async () => {
    const findSuperAdmin =  await User.findOne({email:"superadmin@gohash.com"})
    if(!findSuperAdmin){
      await seedData();
    }
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
