var socket = io('http://localhost:3000');

socket.on('connect', function(){
  console.log('connected to server');
});
socket.on('disconnect', function(){
  console.log('Disconnect to server');
});
socket.on('newMessage', function(message){
  console.log('newMessage',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});
//Evernt ACKnoledgements
// socket.emit('createMessage', {
//     from:'Frank',
//     text:'Hi'
// }, function (data) {
//     console.log('Got it', data);
// });// alart message server and clients

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
    });
});
