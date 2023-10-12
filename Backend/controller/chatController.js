const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Chat = require("../models/chats");
const Message = require("../models/messages");
const { Op } = require("sequelize");

const accessChat = asyncHandler(async (req, res) => {
  try {
    const { groupAdminId } = req.body;

    if (!groupAdminId) {
      return res.status(400).send({
        status: false,
        message: "groupAdminId param not sent with request",
      });
    }

    const isChat = await Chat.findAll({
      where: {
        isGroupChat: true,
        [Op.and]: [{ groupAdminId: req.user.id }],
      },
      include: [
        { model: User, as: "users", attributes: { exclude: ["password"] } },
        {
          model: Message,
          as: "latestMessage",
        },
      ],
    });

    if (isChat.length > 0) {
      return res.status(200).json({ isChat: isChat[0] });
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        groupAdminId: groupAdminId,
      };

      const createdChat = await Chat.create(chatData, {
        include: [
          { model: User, as: "users", attributes: { exclude: ["password"] } },
        ],
      });

      const fullChat = await Chat.findOne({
        where: { id: createdChat.id },
        include: [
          { model: User, as: "users", attributes: { exclude: ["password"] } },
          {
            model: Message,
            as: "latestMessage",
          },
        ],
      });

      return res
        .status(200)
        .json({ fullChat, msg: "Suceessfully Fetch Chats!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: err,
    });
  }
});

const fetchChats = async (req, res) => {
  try {
    const results = await Chat.findAll({
      where: {
        groupAdminId: req.user.id,
      },
      include: [
        { model: User, as: "users", attributes: { exclude: ["password"] } },

        {
          model: Message,
          as: "latestMessage",
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    return res.status(200).send({ status: true, result: results });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  accessChat,
  fetchChats,
};
