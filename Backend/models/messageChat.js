const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Message = require("./messages");

const MessageChat = sequelize.define(
  "MessageChat",
  {
    chatId: {
      type: DataTypes.INTEGER,
      references: {
        model: Chat,
        key: "id",
      },
    },
  },
  {
    tableName: "MessageChat",
    timestamps: true,
  }
);

(async () => {
  await MessageChat.sync({ force: false });
})();

module.exports = MessageChat;