const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Package extends Model {}

Package.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    packageName: {
      type: DataTypes.STRING,
    },
    features: {
      type: DataTypes.JSON,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      require: true,
    },
  },
  {
    tableName: "package",
    timestamps: false,
    sequelize,
  }
);

(async () => {
  await Package.sync();
})();

module.exports = Package;
