angular.module('ZenQuizz', ['ngRoute', 'ng-underscore', 'lbServices'])
  .config(function ($httpProvider, $routeProvider, LoopBackResourceProvider) {
    $routeProvider
      .when('/', {templateUrl: 'views/main.html', controller: 'MainController'})
      .when('/login', {templateUrl: 'views/login.html', controller: 'LoginController'})
      .when('/do/quizz/:id', {templateUrl: 'views/doquizz.html', controller: 'DoQuizzController'})
      .when('/do/quizz/:id/end', {templateUrl: 'views/endquizz.html', controller: 'EndQuizzController'})
      .when('/noquizz', {templateUrl: 'views/endquizz.html', controller: 'EndQuizzController'})
      .when('/do/quizz/:id/question/:n', {templateUrl: 'views/doquestion.html', controller: 'DoQuestionController'})
      .otherwise({redirectTo: '/'});

    // handling http 401
    $httpProvider.interceptors.push(function ($q, $location) {
      return {
        responseError: function (rejection) {
          if (rejection.status == 401) {
            $location.nextAfterLogin = $location.path();
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });

    // set api url, dev only, to be removed after that
    LoopBackResourceProvider.setUrlBase('http://192.168.1.84:3000/api');

  });


