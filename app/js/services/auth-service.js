function AuthApi(itwService, ZenUser, LoopBackAuth) {

  this.logout = function logout() {
    return ZenUser.logout(function(){
      this.clearUser();
    }.bind(this), function(e){
      console.log('logout error');
      if(e.status == 500 || e.status == 401) {
        this.clearUser();
      }
      return e;
    }.bind(this)).$promise;
  };

  this.login = function login(remember, user) {
    return ZenUser.login({rememberMe: remember}, user).$promise;
  };

  this.clearUser = function clearUser() {
    console.log('clear');
    itwService.clearCache();
    LoopBackAuth.clearUser();
    LoopBackAuth.clearStorage();
  };

  this.isAuthenticated = function isAuthenticated() {
    return ZenUser.isAuthenticated();
  };

  this.hasRole = function hasRole(role) {
    return ZenUser.hasRole({role: role}).$promise;
  };

  this.setUser = function setUser(accessToken, userId) {
    LoopBackAuth.setUser(accessToken, userId);
  };
}

angular.module('ZenQuizz').service('authService', ['itwService', 'ZenUser', 'LoopBackAuth', AuthApi]);
