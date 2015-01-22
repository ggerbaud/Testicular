angular.module('ZenQuizz')
  .controller('admin.candidats', ['$scope', 'candidats', function ($scope, candidats) {
    "use strict";

    console.log(candidats);

    $scope.candidats = candidats;


  }])
  .controller('admin.candidats.new', ['$scope', 'ZenUser', function ($scope, ZenUser) {
    "use strict";

    $scope.user = {};

    $scope.send = function () {
      ZenUser.newCandidat({}, $scope.user, function (data) {
        $scope.created = data;
      }, function (httpResponse) {
        if (httpResponse.status == 422) {
          console.error("Email existant");
          $scope.error = httpResponse.data.error.details.messages.email[0];
        }
      });
    };


  }])
  .controller('admin.candidats.view', ['$scope', 'ZenUser', 'user', 'itws', function ($scope, ZenUser, user, itws) {
    "use strict";

    $scope.user = user;
    $scope.itws = itws;


  }])
  .controller('admin.interviews.view', ['$scope', '$routeParams', '$route', '$location', 'Interview', 'itw', 'quizz', function ($scope, $routeParams, $route, $location, Interview, itw, quizz) {
    "use strict";

    $scope.itw = itw || {state: 1, ownerId: $routeParams.userId};
    $scope.quizz = quizz;
    $scope.edit = $routeParams.edit ? true : false;

    $scope.send = function () {
      Interview.upsert({}, $scope.itw, function (data) {
        angular.extend($scope.itw, data);
      });
    };

    $scope.link = function () {
      var attempt = {state: 0,quizzId: $scope.selectedQuizz.id, ownerId: $scope.itw.ownerId}
      Interview.quizzAttempts.create({id:$scope.itw.id}, attempt, function () {
        $route.reload();
      });
    };

    $scope.unlink = function (attemptId) {
      Interview.quizzAttempts.destroyById({id:$scope.itw.id, fk:attemptId}, function () {
        $route.reload();
      });
    }

  }]);
