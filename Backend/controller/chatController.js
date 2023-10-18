const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Message = require("../models/messages");
const Chat = require("../models/Chats");

const accessChat = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({
        status: false,
        message: "userId not sent with request body!",
      });
    }

    const isChat = await Chat.findAll({
      where: {
        chatSenderId: req.user.id,
        userId: userId,
      },
      include: [
        {
          model: User,
          as: "chatsender",
          attributes: ["fullName", "email", "photo"],
        },
        {
          model: User,
          as: "receive",
          attributes: ["fullName", "email", "photo"],
        },
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
        chatSenderId: req.user.id,
        userId,
      };

      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({
        where: { id: createdChat.id },
        include: [
          {
            model: User,
            as: "chatsender",
            attributes: ["fullName", "email", "photo"],
          },
          {
            model: User,
            as: "receive",
            attributes: ["fullName", "email", "photo"],
          },
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
        chatSenderId: req.user.id,
      },
      include: [
        {
          model: User,
          as: "chatsender",
          attributes: { exclude: ["password"] },
        },

        {
          model: User,
          as: "receive",
          attributes: ["fullName", "email", "photo"],
        },

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
