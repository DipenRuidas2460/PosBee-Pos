const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./users");

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatSenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Chat",
    updatedAt: false,
  }
);

(async () => {
  await Chat.sync({ force: false });
})();

Chat.belongsTo(User, { foreignKey: "chatSenderId", as: "chatsender" });
Chat.belongsTo(User, { foreignKey: "userId", as: "receive" });

module.exports = Chat;