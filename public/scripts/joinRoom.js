'use strict';
var app = angular.module('chat-challenge');

app.controller('JoinRoomCtrl', function ($scope, $location, $rootScope, socket) {
    
    $scope.joinDefaultRoom = function () {
        socket.emit('join', 'test', $scope.username);
        $rootScope.username = $scope.username;
        $location.path('/chat');
    };
})