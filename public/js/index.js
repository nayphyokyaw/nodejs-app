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
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();// preventDefault is refresh beheriabira

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation){
    return alert('Gerolocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('sending location....');

    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('sending location ....');
        socket.emit('createLocationMessage',{
            latitide: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('sending location ....');
        alert('Unable to fetch location')
    });
});
