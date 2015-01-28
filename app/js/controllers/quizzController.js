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
  ['$scope', '$location', '$routeParams', 'Breadcrumbs', 'itwService', '_', 'itw', 'info', 'question',
    function ($scope, $location, $routeParams, Breadcrumbs, itwService, _, itw, info, question) {
      "use strict";

      $scope.quizzId = info.attempt.id;
      $scope.questionNo = parseInt($routeParams.n, 10);
      $scope.q = question;
      $scope.q.attempt = $scope.q.attempt || {
        comment: '',
        questionId: question.question.id,
        quizzAttemptId: $scope.quizzId
      };
      if (question.question.choices && !$scope.q.attempt.choices) {
        $scope.q.attempt.choices = _.times(question.question.choices.length, _.constant(false));
      }

      Breadcrumbs.setCrumbs([
        {label: itw.name, route: "#/home"},
        {label: info.quizzName, route: "#/do/quizz/" + $scope.quizzId},
        {label: question.question.title, route: "#/do/quizz/" + $scope.quizzId + "/question/" + $scope.questionNo}
      ]);

      $scope.next = function () {
        itwService.question($scope.quizzId, 0, $scope.q).then(function () {
          $location.path('/do/quizz/' + $scope.quizzId + '/question/' + ($scope.questionNo + 1));
        }, function (er) {
          console.error(er);
        });
      };

    }])
  .controller('quizz.end',
  ['$scope', 'Breadcrumbs', '$location', '$routeParams', 'itw', 'info', 'itwService',
    function ($scope, Breadcrumbs, $location, $routeParams, itw, info, itwService) {
      "use strict";

      $scope.validated = info.attempt.state == 2;
      $scope.info = info;

      Breadcrumbs.setCrumbs([
        {label: itw.name, route: "#/home"},
        {label: info.quizzName, route: "#/do/quizz/" + $scope.info.attempt.id}
      ]);

      $scope.validate = function () {
        itwService.validateQuizz($scope.info.attempt.id).then(function (data) {
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

    }]);
