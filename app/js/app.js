angular
  .module('ZenQuizz', ['ngRoute', 'ngCookies', 'ng-underscore', 'ngMaterial', 'lbServices', 'hljs'])
  .config(
  ['_Provider', '$httpProvider', '$routeProvider', 'LoopBackResourceProvider', 'routeValue', '$mdThemingProvider',
    function (_Provider, $httpProvider, $routeProvider, LoopBackResourceProvider, routeValue, $mdThemingProvider) {

      var defaulResolvers = {};
      defaulResolvers.userAuthenticated = ['$q', 'authService', 'userService', function ($q, authService, userService) {
        var deferred = $q.defer();

        var reject = function () {
          deferred.reject('login_required');
        };

        if (authService.isAuthenticated()) {
          userService().then(function (user) {
            deferred.resolve(user);
          })
        } else {
          reject();
        }

        return deferred.promise;
      }];

      _(routeValue).each(function (params, location) {
        params.location = location;

        var resolve = angular.extend({}, defaulResolvers, params.resolve || {});

        if (params.public) {
          delete resolve.userAuthenticated;
        }

        if (params.role && !params.public) {
          resolve.role = ['$q', 'authService', function ($q, authService) {
            var deferred = $q.defer();

            authService.hasRole(params.role).then(function (result) {
              if (result.hasRole === true) {
                deferred.resolve();
              }
              else {
                deferred.reject('missing_role');
              }
            });

            return deferred.promise;
          }];
        }

        params.resolve = resolve;

        $routeProvider.when(location, params);
      });

      /*
       redirectTo: '/login', */
      $routeProvider
        .when('/logout', {
          resolve: {
            data: ['$location', 'authService', function ($location, authService) {
              var f = function () {
                $location.path('/login');
              };
              authService.logout().then(f, f);
            }]
          }
        })
        .otherwise({redirectTo: '/login'});

      // handling http 401
      $httpProvider.interceptors.push(['$q', '$location', '$injector', function ($q, $location, $injector) {
        return {
          responseError: function (rejection) {
            if (rejection.status == 401) {
              if ($location.path() !== '/logout') {
                console.log('401 on ' + $location.path());
                $location.nextAfterLogin = $location.path();
                $location.path('/logout');
              } else {
                console.log('401 on logout ???');
                $injector.get('authService').clearUser();
                $location.path('/login');
              }
            }
            return $q.reject(rejection);
          }
        };
      }]);

      // Material Design config
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink')
        .warnPalette('red')
        .backgroundPalette('grey');

    }])
  .run(['$rootScope', '$log', '$location', 'authService', function ($rootScope, $log, $location, authService) {

    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {

      switch (rejection) {
        case 'login_required':
          console.log('login_required');
          authService.logout();
          break;
        case 'missing_role':
          console.log('missing_role');
          event.preventDefault();
          $location.path('/login');
          break;
        default :
          $log.error('router', 'Unhandled route resolver rejection', rejection);
      }
    });
  }]);


