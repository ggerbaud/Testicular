var underscore = angular.module('ng-underscore', []);

underscore.factory('_', function() {
  return window._;
});
