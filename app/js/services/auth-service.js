function AuthApi($q, $cacheFactory, $cookies, ZenUser, LoopBackAuth) {

  var cache = $cacheFactory.get('auth-cache') || $cacheFactory('auth-cache');

  var falseRole = {hasRole: false};

  this.logout = function logout() {
    return ZenUser.logout(function () {
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
    return ZenUser.login({rememberMe: remember}, user).$promise;
  };

  this.clearUser = function clearUser() {
    var itwCache = $cacheFactory.get('itw-cache') || $cacheFactory('itw-cache');
    itwCache.removeAll();
    LoopBackAuth.clearUser();
    LoopBackAuth.clearStorage();
    this.clearRole();
    delete $cookies.access_token;
    delete $cookies.userId;
  };

  this.clearRole = function () {
    cache.removeAll();
  };

  this.getUser = function () {
    // no api call here
    var current = ZenUser.getCachedCurrent();
    if (!current) {
      if($cookies.access_token && $cookies.userId) {
        this.setUser($cookies.access_token, $cookies.userId);
      }
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

  this.isAuthenticated = function isAuthenticated() {
    var q = $q.defer();

    if (ZenUser.isAuthenticated()) {
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
      if(!auth) {
        return cache.put('role' + role, falseRole);
      } else {
        return _cacheGetSet('role' + role, function () {
          return ZenUser.hasRole({role: role}).$promise
        }).then(function(resp) {
          return resp;
        });
      }
    });
  };

  this.hasRoleSync = function hasRoleSync(role) {
    if (cache.get('role' + role)) {
      return cache.get('role' + role);
    } else {
      this.hasRole(role);
      return falseRole;
    }
  };

  this.setUser = function setUser(accessToken, userId) {
    LoopBackAuth.setUser(accessToken, userId);
  };

  var _cacheGetSet = function (key, f) {
    var q = $q.defer();
    if (cache.get(key)) {
      q.resolve(cache.get(key));
    } else {
      if (!cache.get('lock' + key)) {
        cache.put('lock' + key, q);
        f().then(function (data) {
          cache.remove('lock' + key);
          q.resolve(cache.put(key, data));
        }, function (rejection) {
          cache.remove('lock' + key);
          q.reject(rejection);
        });
      } else {
        return cache.get('lock' + key).promise;
      }
    }
    return q.promise;
  }
}

angular.module('ZenQuizz').service('authService', ['$q', '$cacheFactory', '$cookies', 'ZenUser', 'LoopBackAuth', AuthApi]);
