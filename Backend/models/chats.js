const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./users");
const Message = require("./messages");

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
    chatSenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    allUsers: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("allUsers")?.split(";");
      },
      set(val) {
        this.setDataValue("allUsers", val?.join(";"));
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

Chat.belongsTo(User, { foreignKey: "chatSenderId", as: "chatsender" });
Chat.belongsTo(User, { foreignKey: "userId", as: "receive" });

Chat.belongsTo(Message, {
  foreignKey: "latestMessageId",
  as: "latestMessage",
});

Message.belongsTo(Chat, { foreignKey: "chatId" });

module.exports = Chat;
