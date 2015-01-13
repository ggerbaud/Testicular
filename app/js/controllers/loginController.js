angular.module('ZenQuizz').controller('LoginController', function ($scope, $location, ZenUser) {
  "use strict";

  $scope.user = {};

  $scope.login = function () {
    ZenUser.login({rememberMe: false}, $scope.user, function () {
      var next = $location.nextAfterLogin || '/';
      $location.nextAfterLogin = null;
      $location.path(next);
    });
  };

  $scope.message = "Login";

});
