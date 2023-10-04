const express = require("express");
const app = express();
const cors = require("cors");
require("../Backend/config/dbConfig");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const apiRoutes = require("../Backend/routes/api");
const userRoutes = require("../Backend/routes/user");
const profileRoutes = require("../Backend/routes/profile");
const { validateTokenMiddleware } = require("../Backend/middleware/auth");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials"
  );
  next();
});

app.use("/profile", profileRoutes);
app.use("/user", validateTokenMiddleware, userRoutes);
app.use("/api", validateTokenMiddleware, apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected at port ${process.env.PORT}`);
});
