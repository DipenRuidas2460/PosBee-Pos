const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class appTxn extends Model {}

appTxn.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    txnId: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 1,
      allowNull: false,
      require: true,
    },
    expiry: {
      type: DataTypes.DATE,
    },
    timeStamp: {
      type: DataTypes.DATE,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "apptxn",
    timestamps: false,
    sequelize,
  }
);

(async () => {
  await appTxn.sync();
})();

module.exports = appTxn;
