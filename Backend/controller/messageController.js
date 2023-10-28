const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Message = require("../models/messages");
const Chat = require("../models/Chats");

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { content, chatId } = req.body;

    const loggedUserId = req.user.id;

    if (!content || !chatId) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid data passed into request" });
    }

    const newMessage = {
      content: content,
      chatId: chatId,
      senderId: loggedUserId,
    };

    const message = await Message.create(newMessage);

    await Chat.update(
      { createdAt: message.createdAt },
      { where: { id: chatId } }
    );

    const populatedMessage = await Message.findByPk(message.id, {
      include: [
        {
          model: Chat,
          as: "msg",
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
          ],
        },
        {
          model: User,
          as: "sender",
          attributes: {
            exclude: ["password", "fpToken", "updatedAt", "createdAt", "role"],
          },
        },
      ],
    });

    const messageSenderId = populatedMessage.msg.chatSenderId;

    if (loggedUserId !== messageSenderId) {
      populatedMessage.msg.userId = messageSenderId;
      populatedMessage.msg.chatSenderId = loggedUserId;
      await populatedMessage.save();
    }

    return res.status(200).json(populatedMessage);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).send(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { chatId: req.params.chatId },
      include: [
        {
          model: Chat,
          as: "msg",
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
          ],
        },
        {
          model: User,
          as: "sender",
          attributes: {
            exclude: ["password", "fpToken", "updatedAt", "createdAt", "role"],
          },
        },
      ],
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

module.exports = { allMessages, sendMessage };
