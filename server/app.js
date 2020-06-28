require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const http = require("http").Server(app);
const server = require('http').createServer();
const io = require('socket.io')(http,{
  path: '/chat'
});
const router = require('express').Router()
// const routes = require("./routes")(io);


const errorHandler = require("./middlewares/errorHandler");
app.set('socketio', io);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());
/////////////////////

io.on("connection", (socket) => {
  socket.on("sendMessage", (msg) => {
   socket.broadcast.emit('sendMessage', msg)
  });
  socket.on('receive peerId', (peerId)=>{
    console.log(peerId, 'ini peer id')
    socket.broadcast.emit('receive peerId', peerId)
  })
  socket.on('reject phone call', (msg)=>{
    socket.broadcast.emit('reject phone call', msg)
  })
  socket.on('end call', (data)=>{
    socket.broadcast.emit('end call',data)
  })
});

////////////////

// app.use(routes);

app.use(errorHandler);

http.listen(PORT, () => {
  console.log(PORT, "========================================");
});
