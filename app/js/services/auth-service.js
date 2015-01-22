function AuthApi(ZenUser, LoopBackAuth) {

  this.logout = function logout() {
    ZenUser.logout(function(a,b){}, function(e){
      console.log('logout error');
      if(e.status == 500 || e.status == 401) {
        this.clearUser();
      }
    }.bind(this));
  };

  this.clearUser = function clearUser() {
    console.log('clear');
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

angular.module('ZenQuizz').service('authService', ['ZenUser', 'LoopBackAuth', AuthApi]);
