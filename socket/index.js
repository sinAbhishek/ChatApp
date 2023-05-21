import express from "express"
import { Server } from "socket.io";
 const app=express()
 const server=app.listen(8900,()=>{
  
  console.log("database connected")
})
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
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
    console.log(userId)
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("test",(msg)=>{
    console.log(users)
    console.log(msg)
    console.log("your current sockeid is"+socket.id)
    io.emit("getUsers", users);
  })
  //send and get message
  socket.on("sendmessage", ({ senderId, receiverId, text }) => {

    const user = getUser(receiverId);
    console.log(text)
    if(user){
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
    else{
        console.log("your message is sent")
    }

  });
 
  socket.on("sendfriendreqid", ({friendid,ownid}) => {
    
    const user = getUser(friendid);
    console.log("freind request id "+friendid)
    console.log(user)
    user?io.to(user.socketId).emit("getfriendreqid", {
      ownid
    }):console.log("wait a sec");
  });
  socket.on("sendfriendacceptid", ({friendid,ownid}) => {
    
    const user = getUser(friendid);
    console.log("friend accept id "+friendid)
    console.log(user)
    user?io.to(user.socketId).emit("getfriendacceptid", {
      ownid
    }):console.log("wait a sec");
  });
  socket.on("sendpendingid", ({friendid,ownid}) => {
    
    const user = getUser(friendid);
    console.log("freind request id "+friendid)
    console.log(user)
    user?io.to(user.socketId).emit("getpendingid", {
      ownid
    }):console.log("wait a sec");
  });
  socket.on("sendfriendremoveid", ({friendid,ownid}) => {
    
    const user = getUser(friendid);
    console.log("freind remove id "+friendid)
    console.log(user)
    user?io.to(user.socketId).emit("getfriendremoveid", {
      ownid
    }):console.log("wait a sec");
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
