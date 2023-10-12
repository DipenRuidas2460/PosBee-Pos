const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./users");

sequelize.define(
  "MessageReadBy",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    tableName: "MessageReadBy",
    timestamps: true,
  }
);

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
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

Message.belongsToMany(User, {
  through: "MessageReadBy",
  foreignKey: "senderId",
  as: "readBy",
});


module.exports = Message;
