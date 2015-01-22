angular.module('ZenQuizz').constant('routeValue', {
  '/': {redirectTo: '/login', public: true},
  '/home': {templateUrl: 'views/main.html', controller: 'main.main'},
  '/do/quizz/:id': {templateUrl: 'views/quizz/do.html', controller: 'quizz.do'},
  '/do/quizz/:id/end': {templateUrl: 'views/quizz/end.html', controller: 'quizz.end'},
  '/noquizz': {templateUrl: 'views/quizz/noquizz.html', controller: angular.noop},
  '/do/quizz/:id/question/:n': {templateUrl: 'views/quizz/question.html', controller: 'quizz.question'},
  '/adm/': {templateUrl: 'views/admin/main.html', controller: angular.noop, role: ['rh']},
  '/adm/candidats': {templateUrl: 'views/admin/candidats.html', controller: 'admin.candidats', role: ['rh'], resolve: {
    candidats: ['ZenUser', function (ZenUser) {
      return ZenUser.listCandidats().$promise;
    }]
  }},
  '/adm/candidats/new': {templateUrl: 'views/admin/candidats/new.html', controller: 'admin.candidats.new', role: ['rh']},
  '/adm/candidats/:id': {templateUrl: 'views/admin/candidats/view.html', controller: 'admin.candidats.view', role: ['rh'], resolve: {
    user: ['$route', 'ZenUser', function ($route, ZenUser) {
      return ZenUser.getCandidat({id: $route.current.params.id}).$promise;
    }],
    itws: ['$route', 'Interview', function ($route, Interview) {
      return Interview.find({filter: {where: {ownerId: $route.current.params.id}}}).$promise;
    }]
  }},
  '/adm/interviews/:id/u/:userId/:edit?': {templateUrl: 'views/admin/interviews/view.html', controller: 'admin.interviews.view', role: 'rh', resolve: {
    itw: ['$route', 'Interview', function ($route, Interview) {
      if($route.current.params.id == -1) return null;
      return Interview.findOne({filter: {where: {id: $route.current.params.id}, include: {quizzAttempts: 'quizz'}}}).$promise;
    }],
    quizz: ['Quizz', function (Quizz) {
      return Quizz.find({filter: {order: 'name ASC'}}).$promise;
    }]
  }},
  '/login': {
    templateUrl: 'views/login.html', controller: 'main.login', public: true, resolve: {
      data: ['authService', '$location', function (authService, $location) {
        if (authService.isAuthenticated()) {
          console.log('Authenticated, go to home');
          $location.path('/home');
        }
      }]
    }
  }
});
