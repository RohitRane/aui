export function routeConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('home', {
            url: '/',
            parent: 'aftermarket',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'

        });
}   