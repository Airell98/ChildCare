require("dotenv").config();
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
  socket.on("join-room", (roomKey) => {
    console.log("Joining room ", roomKey);
    socket.join(roomKey);
  });
});

if (process.env.NODE_ENV !== "test") {
  http.listen(PORT, () => {
    console.log(PORT, "========================================");
  });
}

module.exports = app;
