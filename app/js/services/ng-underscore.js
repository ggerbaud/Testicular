var underscore = angular.module('ng-underscore', []);

underscore.provider('_', [function _Provider() {

  this.$get = window._;
}]);

underscore.factory('_', function () {
  return window._;
});
