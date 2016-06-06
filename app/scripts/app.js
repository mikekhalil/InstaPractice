'use strict';

var app = angular
  .module('instaPracticeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/search',{
        templateUrl:'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .otherwise({
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      });
  });

 
app.controller('ProfileCtrl', function ($scope, $location, $http, $rootScope) {
  //Edit active portion of navbar
  $('.userProfile').addClass('active');
  $('.search').removeClass('active');

  //grab access token from the URL (bad practice for production app, just a front end hack)
  var accessToken = $location.path().substring(14);
  
  //grabbing user profile
  var cb = '&callback=JSON_CALLBACK';
  var igScope = '&scope=basic+public_content+follower_list+comments+relationships+likes';
  var req = 'https://api.instagram.com/v1/users/self/?access_token=' + accessToken + cb + igScope;


  //Using jsonp to get around cross domain issue
  $http.jsonp(req).success(function(data) {
      //console.log(data);
      $scope.igItem = data;
  });

  //Put access token in root scope so we can use it in the search controller as well
  $rootScope.aToken = accessToken;

  //Grab recent media from specified user
  var recentMedia = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken + cb;
   $http.jsonp(recentMedia).success(function(data) {
        $scope.recentMedia = data;
        console.log(data);
  });
});

app.controller('SearchCtrl', function($scope,$location,$http, $rootScope) {
  //Edit active portion of navBar
  $('.userProfile').removeClass('active');
  $('.search').addClass('active');


  var accessToken = $rootScope.aToken;
  var cb = '&callback=JSON_CALLBACK';
  var req = 'https://api.instagram.com/v1/tags/paintball/media/recent?access_token=' + accessToken + cb;

  
  $http.jsonp(req).success(function(data) {
      $scope.taggedMedia = data;
  });

});
