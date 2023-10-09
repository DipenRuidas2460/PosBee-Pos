const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/dbConfig");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prefix: {
      type: Sequelize.ENUM,
      values: ["Mr", "Mrs", "Miss"],
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      defaultValue: "customer",
    },
    photo:{
      type: DataTypes.STRING,
      defaultValue:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
    language: {
      type: Sequelize.ENUM,
      values: [
        "English",
        "Spanish - Espanol",
        "Albanian - Shqip",
        "Hindi",
        "Dutch",
        "French - Francais",
        "German - Deutsch",
        "Arabic",
      ],
    },
    fpToken: {
      type: DataTypes.STRING,
    },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "users",
    sequelize,
  }
);

(async () => {
  await User.sync({ force: false });
})();


module.exports = User;
