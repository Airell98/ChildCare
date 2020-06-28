var express = require('express');
var router = express.Router();

/* GET home page. */
var returnRouter = function(io) {
  

    router.use('/chat', function(req, res) {
       io.on('connection', (socket)=>{
           socket.on('sendMessage', (data)=>{
               console.log(data)
           })
       })
    });

    return router;
}

module.exports = returnRouter;
