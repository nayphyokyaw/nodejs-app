var socket = io('http://localhost:3000');

socket.on('connect', function(){
  console.log('connected to server');

  // socket.emit('createMessage',{
  //     from: 'Andrew',
  //     text: 'Yup, That works for me.'
  //   });

  // socket.emit('createEmail',{
  //   to: 'Jen@example.com',
  //   text: 'Hey.This is Andrew'
  // });
});
socket.on('disconnect', function(){
  console.log('Disconnect to server');
});

socket.on('newMessage', function(message){
  console.log('newMessage',message);
});
// socket.on('newEmail', function(email){
//   console.log('New email', email);
// });
