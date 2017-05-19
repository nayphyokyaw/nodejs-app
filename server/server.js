const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const prots = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {  //index.html socket
  console.log('new user connected');

  // socket.emit('newMessage', {
  //   from: 'Jhon',
  //   text: 'someOne call me.'
  // });

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hay. What is going on',
  //   createAt: 212
  //   });

 // socket.emit from Admin text welcome to the chat app
 socket.emit('newMessage',{
   from: 'Admin',
   text: 'welcome to the chat app',
   createAt: new Date().getTime()
 });
 // socket.broadcast.emit from Admin text New user joined
 socket.broadcast.emit('newMessage', {
   from: 'Admin',
   text: 'New user Joined',
   createAt: new Date().getTime()
 });
    socket.on('createMessage',(message) => {
      console.log('createMessage', message);
      io.emit('newMessage', {
        form: message.from,
        text: message.text,
        createAt: new Date().getTime() // Time method
      });

    // socket.broadcast.emit('newMessage',{
    //   from: message.form,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // });
    });

    socket.on('createEmail', (newEmail) => {
      console.log('createEmail', newEmail);
    });

  socket.on('disconnect', () => {
    console.log('User was disconnect');
  });
});

server.listen(3000, () => {
  console.log(`Server is starting on prots: ${prots}`);
})
