const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Message = require("../models/messages");
const Chat = require("../models/Chats");
const { Op } = require("sequelize");

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
        [Op.and]: [
          {
            [Op.or]: [
              { "$chatsender.id$": req.user.id },
              { "$receive.id$": req.user.id },
            ],
          },
          {
            [Op.or]: [
              { "$chatsender.id$": userId },
              { "$receive.id$": userId },
            ],
          },
        ],
      },
      include: [
        {
          model: User,
          as: "chatsender",
          attributes: ["id", "fullName", "email", "photo"],
        },
        {
          model: User,
          as: "receive",
          attributes: ["id", "fullName", "email", "photo"],
        },
        {
          model: Message,
          as: "msg",
        },
      ],
    });

    if (isChat.length > 0) {
      let loggedUserId = req.user.id;
      if (loggedUserId !== isChat[0].chatSenderId) {
        isChat[0].chatSenderId = loggedUserId;
        isChat[0].userId = userId;
        [isChat[0].chatsender, isChat[0].receive] = [
          isChat[0].receive,
          isChat[0].chatsender,
        ];
        await isChat[0].save();
      }
      return res.status(200).json({ isChat: isChat[0] });
    } else {
      const chatData = {
        chatSenderId: req.user.id,
        userId: userId,
      };

      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({
        where: { id: createdChat.id },
        include: [
          {
            model: User,
            as: "chatsender",
            attributes: ["id", "fullName", "email", "photo"],
          },
          {
            model: User,
            as: "receive",
            attributes: ["id", "fullName", "email", "photo"],
          },
          {
            model: Message,
            as: "msg",
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
        [Op.or]: [
          { "$chatsender.id$": req.user.id },
          { "$receive.id$": req.user.id },
        ],
      },
      include: [
        {
          model: User,
          as: "chatsender",
          attributes: { exclude: ["password", "fpToken", "role", "updatedAt"] },
        },

        {
          model: User,
          as: "receive",
          attributes: ["id", "fullName", "email", "photo"],
        },

        {
          model: Message,
          as: "msg",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (results.length > 0) {
      let loggedUserId = req.user.id;
      if (loggedUserId !== results[0]?.chatSenderId) {
        [results[0].chatSenderId, results[0].userId] = [
          results[0].userId,
          results[0].chatSenderId,
        ];
        [results[0].chatsender, results[0].receive] = [
          results[0].receive,
          results[0].chatsender,
        ];
      }
      await results[0].save();
      return res.status(200).send({ status: true, result: results });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  accessChat,
  fetchChats,
};
