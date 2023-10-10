const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./users");
const Message = require("./messages");

class Chat extends Model {}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatName: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
    },
    isGroupChat: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    groupAdminId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    latestMessageId: {
      type: DataTypes.INTEGER,
      references: {
        model: Message,
        key: "id",
      },
    },
  },
  {
    tableName: "chats",
    sequelize,
  }
);

(async () => {
  await Chat.sync({ force: true });
})();

User.hasMany(Chat, { foreignKey: "groupAdminId", as: "groupAdmin" })
Chat.belongsTo(User, { foreignKey: "groupAdminId", as: "groupAdmin" });

Message.hasMany(Chat, { foreignKey: "latestMessageId", as: "latestMessage" })
Chat.belongsTo(Message, { foreignKey: "latestMessageId", as: "latestMessage" });

Chat.belongsToMany(User, {
  through: "UserChat",
  foreignKey: "chatId",
  otherKey: "userId",
  as: "users",
});
User.belongsToMany(Chat, {
  through: "UserChat",
  foreignKey: "userId",
  otherKey: "chatId",
  as: "chats",
});

// Chat.hasMany(Message, { foreignKey: "chatId", as: "chat" })
Message.belongsTo(Chat, { foreignKey: "chatId", as: "chat" });

module.exports = Chat;
