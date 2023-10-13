const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Chat = require("../models/chats");
const Message = require("../models/messages");

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { chatId: req.params.chatId },
      include: [
        { model: User, as: "sender", attributes: ["fullName", "photo", "email"] },
        { model: Chat },
      ],
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

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
        { model: User, as: "sender", attributes: ["fullName", "photo"] },
        {
          model: Chat,
          include: [
            {
              model: User,
              as: "users",
              attributes: ["fullName", "photo", "email"],
            },
          ],
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

module.exports = { allMessages, sendMessage };
