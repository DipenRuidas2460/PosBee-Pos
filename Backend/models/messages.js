const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Chat = require("./chats");
const User = require("./users");

sequelize.define("MessageReadBy", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

const Message = sequelize.define(
  "Message",
  {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Chat",
        key: "id",
      },
    },
  },
  {
    tableName: "Message",
    timestamps: true,
  }
);

(async () => {
  await Message.sync({ force: false });
})();

Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });

// Message.belongsTo(Chat, { foreignKey: "chatId", as: "chat"});

Message.belongsToMany(User, {
  through: "MessageReadBy",
  foreignKey: "messageId",
  otherKey: "userId",
  as: "readBy",
});

module.exports = Message;
