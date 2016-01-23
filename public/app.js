'use strict';
var app = angular.module('chat-challenge', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'btford.socket-io',
    'luegg.directives' 
]);

app.config(function ($routeProvider) {
    
    $routeProvider
    .when('/', {
        redirectTo: '/joinRoom'
    })
    .when('/joinRoom', {
        templateUrl: 'views/joinRoom.html',
        controller: 'JoinRoomCtrl'
    })
    .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
    
});