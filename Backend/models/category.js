const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class category extends Model {}

category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
  },
  {
    tableName: "category",
    timestamps: false,
    sequelize,
  }
);

(async () => {
  await category.sync();
})();

module.exports = category;
