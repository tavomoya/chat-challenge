'use strict';
var app = angular.module('chat-challenge');

app.controller('NavCtrl', function ($scope, $location, $rootScope, socket) {
    
   $scope.leaveRoom = function () {
        socket.emit('leave', 'test');
        delete $rootScope.username;
        $location.path('/');
   }; 
        

});