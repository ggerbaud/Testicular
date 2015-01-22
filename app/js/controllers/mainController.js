angular.module('ZenQuizz').controller('main.main', ['$scope', '$location', 'ZenUser', 'userService', function ($scope, $location,  ZenUser, userService) {
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

}])
.controller('main.login', ['$scope', '$location', 'ZenUser', function ($scope, $location, ZenUser) {
  "use strict";

  $scope.user = {};

  $scope.login = function () {
    ZenUser.login({rememberMe: false}, $scope.user, function () {
      var next = $location.nextAfterLogin || '/';
      $location.nextAfterLogin = null;
      $location.path(next);
    });
  };

}]);
