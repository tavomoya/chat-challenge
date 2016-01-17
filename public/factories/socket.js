'use strict';
var app = angular.module('chat-challenge');

app.factory('socket', function (socketFactory) {
    var myIo = io.connect("http://localhost:3000");
    
    var socket = socketFactory({
        ioSocket: myIo
    });
    
    return socket;
})