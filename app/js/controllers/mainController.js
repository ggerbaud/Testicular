angular.module('ZenQuizz').controller('MainController', function ($scope, $location,  ZenUser, userService) {
  "use strict";

  $scope.getInterview = function () {
    userService()
      .then(function (user) {
        return ZenUser.prototype$userInterview({id: user.id}).$promise;
      })
      .then(function (itw) {
        $scope.itw = itw;
      }, function (response) {
        if (response.status == 404) {
          $location.path('noquizz');
        }
      });
  };

  $scope.getInterview();

});
