export function routeConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('category', {
            url: '/category/:catName',
            parent: 'aftermarket',
            templateUrl: 'app/category/category.html',
            controller: 'CategoryController',
            controllerAs: 'category'

        });
}   