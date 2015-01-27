angular.module('ZenQuizz').controller('main.main', ['$scope', 'Breadcrumbs', '$location', 'itw',
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
  .controller('main.login', ['$scope', '$location', 'ZenUser', function ($scope, $location, ZenUser) {
    "use strict";

    $scope.user = {};

    $scope.login = function () {
      ZenUser.login({rememberMe: false}, $scope.user, function () {
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        console.log('go to ' + next);
        $location.path(next);
      });
    };

  }]);
