const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const package = require("./package");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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
      allowNull: true,
      require: true,
    },
    catagory: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
    },
    subscriptionType: {
      type: DataTypes.INTEGER,
    },
    createdTime: {
      type: DataTypes.DATE,
    },
    streamKey: {
      type: DataTypes.STRING,
    },
    userType: {
      type: DataTypes.INTEGER,
    },
    fpToken: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    sequelize,
  }
);

(async () => {
  await User.sync({force:false});
})();

User.hasOne(package, {
  foreignKey: "subscriptionType",
  sourceKey: "subscriptionType",
});

module.exports = User;
