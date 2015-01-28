function ItwApi($q, $cacheFactory, userService, ZenUser, QuizzAttempt) {

  var cache = $cacheFactory.get('itw-cache') || $cacheFactory('itw-cache');

  this.itw = function () {
    return _cacheGetSet('itw', function () {
      return userService()
        .then(function (user) {
          return ZenUser.prototype$userInterview({id: user.id}).$promise;
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

  var _cacheGetSet = function (key, f) {
    var q = $q.defer();
    if (cache.get(key)) {
      q.resolve(cache.get(key));
    } else {
      f().then(function (data) {
        q.resolve(cache.put(key, data));
      }, function (rejection) {
        q.reject(rejection);
      });
    }
    return q.promise;
  }

}

angular.module('ZenQuizz').service('itwService', ['$q', '$cacheFactory', 'userService', 'ZenUser', 'QuizzAttempt', ItwApi]);
