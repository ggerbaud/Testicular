angular.module('ZenQuizz').factory('userService', ['$q', 'ZenUser', function userServiceFactory($q, ZenUser) {
  "use strict";

  return function () {
    // no api call here
    var current = ZenUser.getCachedCurrent();
    if (!current) {
      // it's a promise !! Also fail with 401 if no user logged in
      return ZenUser.getCurrent().$promise;
    }
    else {
      // get the user the promise way
      var q = $q.defer();
      q.resolve(current);
      return q.promise;
    }
  };
}]);
