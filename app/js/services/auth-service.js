function AuthApi($q, $cookies, cacheService, TUser, LoopBackAuth) {

  var cache = cacheService.get('auth-cache');

  var falseRole = {hasRole: false};

  this.logout = function logout() {
    return TUser.logout(function () {
      this.clearUser();
    }.bind(this), function (e) {
      console.log('logout error');
      if (e.status == 500 || e.status == 401) {
        this.clearUser();
      }
      return e;
    }.bind(this)).$promise;
  };

  this.login = function login(remember, user) {
    return TUser.login({rememberMe: remember}, user).$promise;
  };

  this.clearUser = function clearUser() {
    var itwCache = $cacheFactory.get('itw-cache') || $cacheFactory('itw-cache');
    itwCache.removeAll();
    LoopBackAuth.clearUser();
    LoopBackAuth.clearStorage();
    cacheService.clear();
    delete $cookies.access_token;
    delete $cookies.userId;
  };

  this.clearRole = function () {
    cache.removeAll();
  };

  this.getUser = function () {
    // no api call here
    var current = TUser.getCachedCurrent();
    if (!current) {
      if ($cookies.access_token && $cookies.userId) {
        this.setUser($cookies.access_token, $cookies.userId);
      }
      // it's a promise !! Also fail with 401 if no user logged in
      return TUser.getCurrent().$promise;
    }
    else {
      // get the user the promise way
      var q = $q.defer();
      q.resolve(current);
      return q.promise;
    }
  };

  this.isAuthenticated = function isAuthenticated() {
    var q = $q.defer();

    if (TUser.isAuthenticated() && !cache.get('lock-user')) {
      q.resolve(true);
    } else {
      this.getUser().then(function (user) {
        q.resolve(!!user);
      }, function () {
        q.resolve(false);
      });
    }

    return q.promise;
  };

  this.hasRole = function hasRole(role) {
    return this.isAuthenticated().then(function (auth) {
      if (!auth) {
        return cache.put('role' + role, falseRole);
      } else {
        return cache.getAndSet('role' + role, function () {
          return TUser.hasRole({role: role}).$promise
        });
      }
    });
  };

  this.setUser = function setUser(accessToken, userId) {
    LoopBackAuth.setUser(accessToken, userId);
  };
}

angular.module('Testicular').service('authService', ['$q', '$cookies', 'cacheService', 'TUser', 'LoopBackAuth', AuthApi]);
