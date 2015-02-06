angular.module('Testicular').controller('main.main', ['$scope', 'Breadcrumbs', '$location', 'itw',
  function ($scope, Breadcrumbs, $location, itw) {
    "use strict";

    Breadcrumbs.setCrumbs([
      {label: itw.name, route: "#/home"}
    ]);

    $scope.itw = itw;

    $scope.chooseQuizz = function (idQuizz) {
      $location.path('do/quizz/' + idQuizz);
    };

  }])
  .controller('main.login', ['$scope', 'Breadcrumbs', '$location', 'authService', function ($scope, Breadcrumbs, $location, authService) {
    "use strict";

    Breadcrumbs.setCrumbs([]);

    $scope.user = {};

    $scope.login = function () {
      authService.login(true, $scope.user).then(function () {
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);
      });
    };

  }])
  .controller('main.login.google', ['$location', '$cookies', 'authService', function ($location, $cookies, authService) {
    "use strict";

    authService.setUser($cookies.access_token, $cookies.userId);
    authService.clearRole();
    $location.path('/adm');

  }]);
