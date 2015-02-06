function ItwApi(cacheService, authService, TUser, QuizzAttempt) {

  var cache = cacheService.get('itw-cache');

  this.itw = function () {
    return cache.getAndSet('itw', function () {
      return authService.getUser().then(function (user) {
        return TUser.prototype$userInterview({id: user.id}).$promise;
      });
    });
  };

  this.quizzInfo = function (id) {
    return QuizzAttempt.prototype$quizzInfo({id: id}).$promise;
  };

  this.question = function (quizzId, questionNo, question) {
    if (question) {
      if (question.attempt.id) {
        return QuizzAttempt.prototype$__updateById__attempts({
          id: quizzId,
          fk: question.attempt.id
        }, question.attempt).$promise;
      } else {
        return QuizzAttempt.prototype$__create__attempts({id: quizzId}, question.attempt).$promise;
      }
    }
    else {
      return QuizzAttempt.prototype$quizzQuestions({id: quizzId, n: questionNo}).$promise;
    }
  };

  this.validateQuizz = function (quizzId) {
    return QuizzAttempt.prototype$validate({id: quizzId}).$promise
  };

  this.clearCache = function () {
    cache.removeAll();
  };

}

angular.module('Testicular').service('itwService', ['cacheService', 'authService', 'TUser', 'QuizzAttempt', ItwApi]);
