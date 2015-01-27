angular.module('ZenQuizz').controller('main.root', ['$scope', 'Breadcrumbs', function ($scope, Breadcrumbs) {
  "use strict";

  $scope.breadcrumbs = function () {
    return Breadcrumbs.crumbs();
  };

  $scope.isBreadcrumbsEmpty = function () {
    return Breadcrumbs.isEmpty();
  };
}]);
