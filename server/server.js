const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const prots = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // path join

io.on('connection', (socket) => {  //index.html socket
  console.log('new user connected');

//admin and all clients show newMessage when start web chats app
  socket.emit('newMessage', generateMessage('Admin','welcome to chat app'));
//admin alway show clients newMessage when start web chats app
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


  socket.on('createMessage', (message, callback) => {
      console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        });//socket.on clients & server createMessage ending

   socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitide, coords.longitude));
   });

    socket.on('disconnect', () => {
        console.log('User was disconnect');
});// socket.on server message disconnect ending
});//io.on server message connection ending

server.listen(3000, () => {
  console.log(`Server is starting on prots: ${prots}`);
});
