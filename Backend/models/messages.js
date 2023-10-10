const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Chat = require("./chats");
const User = require("./users");

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
      references: {
        model: Chat,
        key: "id",
      },
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "messages",
    sequelize,
  }
);

(async () => {
  await Message.sync({ force: true });
})();

User.hasMany(Message, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });

// Chat.hasMany(Message, { foreignKey: "chatId", as: "chat" });
// Message.belongsTo(Chat, { foreignKey: "chatId", as: "chat" });

Message.belongsToMany(User, {
  through: "MessageReadBy",
  foreignKey: "messageId",
  otherKey: "userId",
  as: "readBy",
});

module.exports = Message;
