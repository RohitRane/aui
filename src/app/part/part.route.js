export function routeConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('part', {
            url: '/part/:type/:id?val',
            parent: 'aftermarket',
            templateUrl: 'app/part/part.html',
            controller: 'PartController',
            controllerAs: 'part'
        });
}   