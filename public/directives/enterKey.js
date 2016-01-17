'use strict';
var app = angular.module('chat-challenge');

app.directive('enterKey', function () {
    return function (scope, element, attrs) {
        element.bind('keydown press', function (e) {
            if(e.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.enterKey);
                });
            };
        });   
    };
});