'use strict';
var nipple = angular.module('nippel',['ngResource']);
// http://stackoverflow.com/questions/8537601/is-there-a-free-json-proxy-server-which-supports-cors-or-jsonp
nipple.controller('NippelCtrl', function($scope, ShitService, $log) {
    $.getJSON("http://query.yahooapis.com/v1/public/yql",
      {
        q:      'select * from json where url=\"http://www.facebook.com/feeds/page.php?id=207914732589506&format=json\"',
        format: "json"
      },
      function (data) {
        if (data.query.results && data.query.results.json.entries) {
            $scope.$apply(function () {
                var allThisShitUnfiltered = data.query.results.json.entries;
                filterThisShit(allThisShitUnfiltered);
            })
            
        };
      }
    );
    function filterThisShit (allThisShitUnfiltered) {
        $scope.allTheShit = new Array();
        for (var i=0; i< allThisShitUnfiltered.length; i++) {
            var currentElem = allThisShitUnfiltered[i];
            var $html = $('<html>').html(currentElem.content);

            var el = document.createElement( 'div' );
            el.innerHTML = currentElem.content;
            var link = el.getElementsByTagName( 'a' )[0];
            var decodedLink = decodeURIComponent(link);
            if (decodedLink.indexOf("youtube") != -1) {
                 var index = decodedLink.indexOf("http://localhost/l.php?u=");
                var length = 'http://localhost/l.php?u=';
                var cleanUrl = decodedLink.substring(index+length.length);
                    $log.log("clean: " + cleanUrl);
                    if (cleanUrl.indexOf("embed") == -1) {
                        if (cleanUrl.indexOf("https") == -1) {
                             var embedUrl=  cleanUrl.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, "http://www.youtube.com/embed/$1");
                             var lastUrl= embedUrl.substring(0,embedUrl.indexOf('&'));
                        } else {
                             var embedUrl=  cleanUrl.replace(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, "http://www.youtube.com/embed/$1");
                             var lastUrl= embedUrl.substring(0,embedUrl.indexOf('&'));
                        }

                    } else {
                          var lastUrl=  cleanUrl;
                    }
                $scope.allTheShit.push(lastUrl);
            }

            // break;
        }
    }
   // var youtubePattern = "http://www.youtube.com/watch?v=";
    $scope.playThatShit = function (shit){
    	shit.videoLink = shit;
    }
});

nipple.factory('ShitService', function($http, $log){
    var shit = {};      
    shit.get = function () {
        return $http({
            method: 'jsonp',
            //method: 'GET', Somehow fails with options request
            url: 'http://query.yahooapis.com/v1/public/yql?q=select+*+from+json+where+url%3D%22http%3A%2F%2Fwww.facebook.com%2Ffeeds%2Fpage.php%3Fid%3D207914732589506%26format%3Djson%22&format=json',
            cache: false
        });
    };
    return shit;
});

