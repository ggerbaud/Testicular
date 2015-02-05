angular.module('ZenQuizz').controller('main.root', ['$scope', '$timeout', '$mdSidenav', 'Breadcrumbs', 'authService', function ($scope, $timeout, $mdSidenav, Breadcrumbs, authService) {
  "use strict";

  $scope.breadcrumbs = function () {
    return Breadcrumbs.crumbs();
  };

  $scope.isBreadcrumbsEmpty = function () {
    return Breadcrumbs.isEmpty();
  };

  $scope.openMenu = function () {
    if (!$scope.shouldHideMenu()) {
      $timeout(function () {
        $mdSidenav("left").open();
      });
    }
  };

  $scope.shouldHideMenu = function () {
    return !$scope.hasRole('zenika');
  };

  $scope.hasRole = function (role) {
    return authService.hasRoleSync(role).hasRole;
  };

  $scope.adminMenu = [
    {role: 'rh', img: 'img/icons/ic_people_24px.svg', title: 'Candidats'},
    {role: 'zenika', img: 'img/icons/ic_people_24px.svg', title: 'Candidats2'},
  ];

}]);
