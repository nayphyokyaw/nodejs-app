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

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location<a/>');

    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
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
    e.preventDefault();// preventDefault is refresh beheriabira
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation){
    return alert('Gerolocation not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage',{
            latitide: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('Unable to fetch location')
    });
});
