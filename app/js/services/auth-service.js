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

  this.clearUser = function clearUser() {
    console.log('clear');
    itwService.reset();
    LoopBackAuth.clearUser();
    LoopBackAuth.clearStorage();
  };

  this.isAuthenticated = function isAuthenticated() {
    return ZenUser.isAuthenticated();
  };

  this.hasRole = function hasRole(role) {
    return ZenUser.hasRole({role: role}).$promise;
  };
}

angular.module('ZenQuizz').service('authService', ['itwService', 'ZenUser', 'LoopBackAuth', AuthApi]);
