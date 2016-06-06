'use strict';
app.controller('ProfileCtrl', function ($scope, $location, $http) {
  var accessToken = $location.path().substring(14);
  console.log('access token : ' + accessToken);
  var req = 'https://api.instagram.com/v1/users/self/?access_token=' + accessToken + '&callback=JSON_CALLBACK';
  req = req.trim();


  console.log('request ' + req); 
  $http.jsonp(req).success(function(data) {
        $scope.igItem = data;
    });
  //$location.path('/profile');
  });