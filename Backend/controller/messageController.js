const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Message = require("../models/messages");
const Chat = require("../models/Chats");

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid data passed into request" });
    }

    const newMessage = {
      content: content,
      chatId: chatId,
      senderId: req.user.id,
    };

    const message = await Message.create(newMessage);

    const populatedMessage = await Message.findByPk(message.id, {
      include: [
        {
          model: Chat,
          include: [
            {
              model: User,
              as: "chatsender",
              attributes: ["id", "fullName", "photo", "email"],
            },
            {
              model: User,
              as: "receive",
              attributes: ["id", "fullName", "photo", "email"],
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

    await Chat.update(
      { latestMessageId: message.id },
      { where: { id: chatId } }
    );

    res.json(populatedMessage);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { chatId: req.params.chatId },
      include: [
        {
          model: Chat,
          include: [
            {
              model: User,
              as: "chatsender",
              attributes: ["id", "fullName", "photo", "email"],
            },
            {
              model: User,
              as: "receive",
              attributes: ["id", "fullName", "photo", "email"],
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
