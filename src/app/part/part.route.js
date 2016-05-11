export function routeConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('part', {
            url: '/part/:type/:id?partNo',
            parent: 'aftermarket',
            templateUrl: 'app/part/part.html',
            controller: 'PartController',
            controllerAs: 'part'
        });
}   