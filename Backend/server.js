const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("../Backend/config/dbConfig");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

const userRoutes = require("../Backend/routes/user");
const profileRoutes = require("../Backend/routes/profile");
const chatRoutes = require("../Backend/routes/chat");
const messageRoutes = require("../Backend/routes/message");
const { validateTokenMiddleware } = require("../Backend/middleware/auth");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials"
  );
  next();
});

app.use("/profile", profileRoutes);
app.use("/user", validateTokenMiddleware, userRoutes);
app.use("/chat", validateTokenMiddleware, chatRoutes);
app.use("/message", validateTokenMiddleware, messageRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("Home Page...");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is connected at port ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Socket.Io connected!");

  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    if (
      !newMessageRecieved.msg.chatSenderId &&
      !newMessageRecieved.msg.userId
    ) {
      return console.log("Message Sender or chat sender not defined!");
    }

    socket
      .in(newMessageRecieved.msg.userId)
      .emit("message recieved", newMessageRecieved);

    // newMessageRecieved.msg.users.forEach((ele) => {
    //   const Id = parseInt(ele)
    //   if (Id === newMessageRecieved.sender.id) {
    //     return;
    //   }
    //   socket.in(Id).emit("message recieved", newMessageRecieved);
    // });
  });

  socket.off("setup", (userData) => {
    console.log("User Disconnected!");
    socket.leave(userData.id);
  });
});
