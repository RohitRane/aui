export function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('aftermarket', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    });

  $urlRouterProvider.otherwise('/');
}
