angular.module('ZenQuizz').controller('quizz.do', ['$scope', '$location', '$routeParams', 'QuizzAttempt', function ($scope, $location, $routeParams, QuizzAttempt) {
  "use strict";

  $scope.quizzId = $routeParams.id;

  $scope.getData = function () {
    QuizzAttempt.prototype$quizzInfo({id: $scope.quizzId}).$promise.then(function (info) {
      $scope.info = info;
      if(info.attempt.state == 2) {
        $location.path('noquizz');
      }
    });
  };

  $scope.getData();

}]);

angular.module('ZenQuizz').controller('quizz.question', ['$scope','$location', '$routeParams', 'QuizzAttempt', '_', function ($scope, $location, $routeParams, QuizzAttempt, _) {
  "use strict";

  $scope.quizzId = parseInt($routeParams.id, 10);
  $scope.questionNo = parseInt($routeParams.n, 10);
  var newAnswer = true;

  $scope.getData = function () {
    QuizzAttempt.prototype$quizzQuestions(
      {
        id: $scope.quizzId,
        n: $scope.questionNo
      }
    ).$promise.then(function (question) {
        $scope.q = question;
        if (question.attempt) {
          newAnswer = false;
        }
        else {
          $scope.q.attempt = {
            comment: '',
            questionId: question.question.id,
            quizzAttemptId: $scope.quizzId,
            choices: _.times(question.question.choices.length, _.constant(false))
          };
        }
      }, function(response) {
        if(response.status == 404) {
          $location.path('do/quizz/' + $scope.quizzId + '/end');
        }
      });
  };

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

  $scope.getData();

}]);

angular.module('ZenQuizz').controller('quizz.end', function ($scope, $location, $routeParams, QuizzAttempt) {
  "use strict";

  $scope.quizzId = $routeParams.id ? parseInt($routeParams.id, 10) : -1;
  $scope.validated = $scope.quizzId < 0;

  $scope.getData = function () {
    if(!$scope.validated) {
      QuizzAttempt.prototype$quizzInfo({id: $scope.quizzId}).$promise.then(function (info) {
        $scope.info = info;
        if(info.attempt.state == 2) {
          $scope.validated = true;
        }
      });
    }
  };

  $scope.validate = function () {
    QuizzAttempt.prototype$validate({id: $scope.quizzId}).$promise.then(function (data) {
      if(data.status == 200) {
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
