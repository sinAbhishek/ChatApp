import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import Authroute from "./routes/Auth.js";
import fileUpload from "express-fileupload";
import Conversationroute from "./routes/Conversation.js";
import Messageroute from "./routes/Message.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { Server } from "socket.io";

const PORT = process.env.PORT || 4000;

const app = express();

dotenv.config();
const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MongoUrl);
  } catch (err) {
    throw err;
  }
};

app.use("/public", express.static("public"));
app.use(cors());
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/Auth", Authroute);
app.use("/api/Conversation", Conversationroute);
app.use("/api/message", Messageroute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
    stack: err.stack,
  });
});

const server = app.listen(PORT, () => {
  mongoConnect();
  console.log("database connected");
});
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected with socketid " + socket.id);

  //take userId and socketId from user
  socket.on("adduser", (userId) => {
    console.log(userId);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("test", (msg) => {
    console.log("your current sockeid is" + socket.id);
    io.emit("getUsers", users);
  });
  //send and get message
  socket.on("sendmessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log("your message is sent");
    }
  });

  socket.on("sendfriendreqid", ({ friendid, ownid }) => {
    const user = getUser(friendid);
    console.log("freind request id " + friendid);
    console.log(user);
    user &&
      io.to(user.socketId).emit("getfriendreqid", {
        ownid,
      });
  });
  socket.on("sendfriendacceptid", ({ friendid, ownid }) => {
    const user = getUser(friendid);
    console.log("friend accept id " + friendid);
    console.log(user);
    user &&
      io.to(user.socketId).emit("getfriendacceptid", {
        ownid,
      });
  });
  socket.on("sendpendingid", ({ friendid, ownid }) => {
    const user = getUser(friendid);
    console.log("freind request id " + friendid);
    console.log(user);
    user &&
      io.to(user.socketId).emit("getpendingid", {
        ownid,
      });
  });
  socket.on("sendfriendremoveid", ({ friendid, ownid }) => {
    const user = getUser(friendid);
    console.log("freind remove id " + friendid);
    console.log(user);
    user &&
      io.to(user.socketId).emit("getfriendremoveid", {
        ownid,
      });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
