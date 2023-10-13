const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("service", "root", process.env.ROOT_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
  dialectOptions: {
    connectTimeout: 60000,
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectToDatabase();

module.exports = sequelize;
