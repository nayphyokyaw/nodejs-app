const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const prots = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {  //index.html socket
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin','welcome to chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
     // socket.broadcast.emit('newMessage', {
     //   from: message.from,
     //   text: message.text,
     //   createdAt: new Date().getTime()
     // });
});

  socket.on('disconnect', () => {
    console.log('User was disconnect');
  });
});

server.listen(3000, () => {
  console.log(`Server is starting on prots: ${prots}`);
});
