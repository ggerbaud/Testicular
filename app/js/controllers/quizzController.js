angular.module('ZenQuizz')
  .controller('quizz.do',
  ['$scope', 'Breadcrumbs', '$location', '$routeParams', 'itw', 'info',
    function ($scope, Breadcrumbs, $location, $routeParams, itw, info) {
      "use strict";

      $scope.quizzId = $routeParams.id;
      $scope.info = info;

      Breadcrumbs.setCrumbs([
        {label: itw.name, route: "#/home"},
        {label: info.quizzName, route: "#/do/quizz/" + $scope.quizzId}
      ]);

      $scope.getData = function () {
        if (info.attempt.state == 2) {
          $location.path('noquizz');
        }
      };

      $scope.getData();

    }])
  .controller('quizz.question',
  ['$scope', '$location', '$routeParams', 'Breadcrumbs', '_', 'itw', 'info', 'question',
    function ($scope, $location, $routeParams, Breadcrumbs, _, itw, info, question) {
      "use strict";

      $scope.quizzId = info.attempt.id;
      $scope.questionNo = parseInt($routeParams.n, 10);
      $scope.q = question;
      var newAnswer = !!(question.attempt);
      $scope.q.attempt = $scope.q.attempt || {
        comment: '',
        questionId: question.question.id,
        quizzAttemptId: $scope.quizzId,
        choices: _.times(question.question.choices.length, _.constant(false))
      };

      Breadcrumbs.setCrumbs([
        {label: itw.name, route: "#/home"},
        {label: info.quizzName, route: "#/do/quizz/" + $scope.quizzId},
        {label: question.question.title, route: "#/do/quizz/" + $scope.quizzId + "/question/" + $scope.questionNo}
      ]);

      $scope.next = function () {
        var promise;
        if (newAnswer) {
          promise = QuizzAttempt.prototype$__create__attempts({id: $scope.quizzId}, $scope.q.attempt).$promise;
        } else {
          promise = QuizzAttempt.prototype$__updateById__attempts({
            id: $scope.quizzId,
            fk: $scope.q.attempt.id
          }, $scope.q.attempt).$promise;
        }
        promise.then(function () {
          $location.path('/do/quizz/' + $scope.quizzId + '/question/' + ($scope.questionNo + 1));
        }, function (er) {
          console.error(er);
        });
      };

    }]);

angular.module('ZenQuizz').controller('quizz.end', function ($scope, $location, $routeParams, QuizzAttempt) {
  "use strict";

  $scope.quizzId = $routeParams.id ? parseInt($routeParams.id, 10) : -1;
  $scope.validated = $scope.quizzId < 0;

  $scope.getData = function () {
    if (!$scope.validated) {
      QuizzAttempt.prototype$quizzInfo({id: $scope.quizzId}).$promise.then(function (info) {
        $scope.info = info;
        if (info.attempt.state == 2) {
          $scope.validated = true;
        }
      });
    }
  };

  $scope.validate = function () {
    QuizzAttempt.prototype$validate({id: $scope.quizzId}).$promise.then(function (data) {
      if (data.status == 200) {
        $location.path('/');
      }
      else if (data.status == 204) {
        $scope.validated = true;
      }
      else {
        console.log(data);
      }
    });
  };

  $scope.getData();

});
