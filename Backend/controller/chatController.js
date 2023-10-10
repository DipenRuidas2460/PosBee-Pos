const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Chat = require("../models/chats");
const Message = require("../models/messages");
const { Op } = require("sequelize");

const accessChat = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "UserId param not sent with request" });
    }

    const isChat = await Chat.findAll({
      where: {
        isGroupChat: false,
        [Op.and]: [{ "$users.id$": req.user.id }, { "$users.id$": userId }],
      },
      include: [
        { model: User, as: "users", attributes: { exclude: ["password"] } },
        {
          model: Message,
          as: "latestMessage",
          include: [
            {
              model: User,
              as: "sender",
              attributes: ["name", "photo", "email"],
            },
          ],
        },
      ],
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [{ id: req.user.id }, { id: userId }],
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
            include: [
              {
                model: User,
                as: "sender",
                attributes: ["name", "photo", "email"],
              },
            ],
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
      data: err.message,
    });
  }
});

const fetchChats = async (req, res) => {
  try {
    const results = await Chat.findAll({
      where: {
        "$users.id$": req.user.id,
      },
      include: [
        { model: User, as: "users", attributes: { exclude: ["password"] } },
        {
          model: User,
          as: "groupAdmin",
          attributes: { exclude: ["password"] },
        },
        {
          model: Message,
          as: "latestMessage",
          include: [
            { model: User, as: "sender", attributes: ["name", "photo", "email"] },
          ],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const createGroupChat = asyncHandler(async (req, res) => {
  try {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the fields" });
    }

    const users = JSON.parse(req.body.users);

    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
    });

    await groupChat.addUsers(users);

    await groupChat.setGroupAdmin(req.user);

    const fullGroupChat = await Chat.findByPk(groupChat.id, {
      include: [
        { model: User, as: "users", attributes: { exclude: ["password"] } },
        {
          model: User,
          as: "groupAdmin",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.update(
      { chatName: chatName },
      {
        where: { id: chatId },
        returning: true,
      }
    );

    if (updatedChat[0] === 0 || !updatedChat[1][0]) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      const updatedChatWithUsers = await Chat.findByPk(chatId, {
        include: [
          { model: User, as: "users", attributes: { exclude: ["password"] } },
          {
            model: User,
            as: "groupAdmin",
            attributes: { exclude: ["password"] },
          },
        ],
      });

      res.json(updatedChatWithUsers);
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findByPk(chatId, {
      include: [
        { model: User, as: "users", attributes: { exclude: ["password"] } },
        {
          model: User,
          as: "groupAdmin",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    if (!chat) {
      res.status(404);
      throw new Error("Chat Not Found");
    }

    await chat.removeUser(userId);

    const updatedChatWithUsers = await Chat.findByPk(chatId, {
      include: [
        { model: User, as: "users", attributes: { exclude: ["password"] } },
        {
          model: User,
          as: "groupAdmin",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.json(updatedChatWithUsers);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findByPk(chatId, {
      include: [
        { model: User, as: "users", attributes: { exclude: ["password"] } },
        {
          model: User,
          as: "groupAdmin",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    if (!chat) {
      return res.status(404).send({ status: false, msg: "Chat Not Found" });
    }

    const updatedChat = await chat.addUser(userId);

    const updatedChatWithUsers = await Chat.findByPk(chatId, {
      include: [
        { model: User, as: "users", attributes: { exclude: ["password"] } },
        {
          model: User,
          as: "groupAdmin",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.json(updatedChatWithUsers);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
