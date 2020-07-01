// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const http = require("http").Server(app);
// const server = require('http').createServer();
const routes = require("./routes");
const io = require("socket.io")(http, {
  path: "/chat",
});
// const router = require('express').Router()
// const routes = require("./routes")(io);
const errorHandler = require("./middlewares/errorHandler");
app.set("socketio", io);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

io.on("connection", (socket) => {
  socket.on("sendMessage", (payload) => {
    socket.broadcast.in(payload.roomKey).emit("sendMessage", payload);
  });
  socket.on("receive peerId", (payload) => {
    console.log(payload, "ini peer id");
    socket.broadcast.in(payload.roomKey).emit("receive peerId", payload);
  });
  socket.on("reject phone call", (payload) => {
    socket.broadcast.in(payload.roomKey).emit("reject phone call", payload.msg);
  });
  socket.on("end call", (payload) => {
    socket.broadcast.in(payload.roomKey).emit("end call", payload.msg);
  });
  socket.on("mute Video", (payload)=>{
    socket.broadcast.in(payload.roomKey).emit("mute Video");
  })
  socket.on('unMute Video', (payload)=>{
    socket.broadcast.in(payload.roomKey).emit("unMute Video");
  })
  socket.on('pause', (payload)=>{
    socket.broadcast.in(payload.roomKey).emit("pause");
  })
  socket.on("join-room", (roomKey) => {
    console.log("Joining room ", roomKey);
    socket.join(roomKey);
  });
  socket.on("settingRoomDashboardUnread", (payload) => {
    socket.join(payload);
  });
  socket.on("fetchingPartner", (payload) => {
    socket.broadcast.in(payload.key).emit("fetchingClientMsg");
  });
});

if (process.env.NODE_ENV !== "test") {
  http.listen(PORT, () => {
    console.log(PORT, "========================================");
  });
}

module.exports = app;
