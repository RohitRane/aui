export function routeConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('part', {
            url: '/part/:type/:id?val&cat1&cat2&cat3&str&y&mk&md',
            parent: 'aftermarket',
            templateUrl: 'app/part/part.html',
            controller: 'PartController',
            controllerAs: 'part'
        });
}   