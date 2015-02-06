angular.module('Testicular').controller('main.root', ['$scope', '$timeout', '$mdSidenav', 'Breadcrumbs', 'authService', function ($scope, $timeout, $mdSidenav, Breadcrumbs, authService) {
  "use strict";

  $scope._hasRole = {};

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
    return !$scope.hasRole('editor');
  };

  $scope.hasRole = function (role) {
    if($scope._hasRole[role] === undefined) {
      $scope._hasRole[role] = false;
      authService.hasRole(role).then(function(result) {
        $scope._hasRole[role] = result.hasRole;
      }, function () {
        delete $scope._hasRole[role]
      });
    }
    return $scope._hasRole[role];
  };

  $scope.adminMenu = [
    {role: 'rh', img: 'img/icons/ic_people_24px.svg', title: 'Candidats'},
    {role: 'editor', img: 'img/icons/ic_people_24px.svg', title: 'Candidats2'},
  ];

}]);
