export function routeConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('part', {
            url: '/part?',
            parent: 'aftermarket',
            templateUrl: 'app/part/part.html',
            controller: 'PartController',
            controllerAs: 'part'

        });
}   