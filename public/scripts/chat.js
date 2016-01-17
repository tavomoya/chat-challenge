'use strict';
var app = angular.module('chat-challenge');

app.controller('ChatCtrl', function ($scope, $location, $rootScope, socket) {

    if (!$rootScope.username) {
        $location.path('/');
    };
    
    $scope.messages = [];
    
   $scope.sendMessage = function () {
       if ($scope.message != '') {
            var msg = {
                message: $scope.message, 
                username: $rootScope.username,
                room: 'test'
            };
            
            socket.emit('message', msg);   
       }
   }; 
   
   socket.on('new message', function (msg) {
       $scope.messages.push(msg);
       $scope.message = "";
   });
   
   //Jquery force
   var container = $('.container');
   
   container[0].scrollTop = container[0].scrollHeight;
        

});