const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/dbConfig");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SKU",
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "As Seen",
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    productPhoto: {
      type: DataTypes.JSON,
      //   defaultValue:
      //     "https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    regularPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    sequelize,
  }
);

(async () => {
  await Product.sync({ force: false });
})();

module.exports = Product;
