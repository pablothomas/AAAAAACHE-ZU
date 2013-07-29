'use strict';
var nipple = angular.module('nippel',['ngResource']);

nipple.controller('NippelCtrl', function($scope, NippelService) {
    $scope.allTheShit = NippelService.query();
    var youtubePattern = "http://www.youtube.com/watch?v=";
    $scope.playThatShit = function (shit){
    	shit.videoLink = shit.source;
    }
});

nipple.factory('NippelService', function($resource){
	var facebookToken = "https://developers.facebook.com/tools/explorer";
    return $resource("https://graph.facebook.com/207914732589506/posts?access_token="+facebookToken, {}, {
        query: { 
            method:'GET'
        }
    });
});

