const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./users");
const Message = require("./messages");
// const MessageChat = require("./messageChat");

sequelize.define(
  "UserChats",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    tableName: "UserChats",
    timestamps: true,
  }
);

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },

    isGroupChat: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    groupAdminId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    latestMessageId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Message",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "Chat",
  }
);

(async () => {
  await Chat.sync({ force: false });
})();

Chat.belongsTo(User, { foreignKey: "groupAdminId", as: "users" });

Chat.belongsTo(Message, {
  foreignKey: "latestMessageId",
  as: "latestMessage",
});

Chat.belongsToMany(User, {
  through: "UserChats",
  foreignKey: "groupAdminId",
});

Message.belongsTo(Chat, { foreignKey: "chatId" });

module.exports = Chat;
