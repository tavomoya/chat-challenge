"use strict";

var path    = require('path');
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);
var giphy   = require('giphy-api')();
var q       = require('q');

app.use(express.static(path.join(__dirname, '/public')));


app.post('/getGif', function (req, res) {
    var deferred = q.defer();
    
    giphy.search(req.body.query)
    .then(function (res) {
        console.log('response', res);
        deferred.resolve(res.data[0]);
    }, function (err) {
        deferred.reject(err);
    });
    
    return deferred.promise;
    
})

server.listen(3000, function () {
  console.log('Ready to chat on port 3000!');
});

//
// Handle a new client connection and setup
// event handlers
//
io.on('connection', function (socket) {
  console.log('user connected :)')
  //
  // Allow the client to join a specified room
  //
  socket.on('join', function (roomName) {
    socket.join(roomName);

  });

  //
  // Allow the client to leave a specified room
  //
  socket.on('leave', function (roomName) {

    socket.leave(roomName);

  });

  //
  // Allow the client to send a message to any room
  // they have already joined
  //
  socket.on('message', function (data) {
    if (/^\/giphy/.test(data.message)) {
        var query = data.message.slice(8);
        giphy.search(query)
        .then(function (res) {
            io.in(data.room).emit('new message', {
                message: res.data[0].images.fixed_width,
                timestamp: Date.now(),
                user: data.username,
                giphy: true
            }); 
        }, function (err) {
            io.in(data.room).emit('new message', {
                message: 'There was an error requesting the image :/',
                timestamp: Date.now(),
                user: data.username
            }); 
        });
    } else {
        io.in(data.room).emit('new message', {
            message: data.message,
            timestamp: Date.now(),
            user: data.username
        });           
    }

  });

});
