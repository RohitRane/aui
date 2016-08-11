export function routerConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('searchResults', {
            //url: '/search?mode&cat1&cat2&cat3',
            url: '/search?str&cat1&cat2&cat3&from&size&mode&filters&filterObject&y&mk&md&sort&ics',
            parent: 'aftermarket',
            templateUrl: 'app/search-results/search-results.html',
            controller: 'SearchResultsController',
            controllerAs: 'srchRes',
            resolve: {},
            onEnter: function (SearchBarService) {
            },
            onExit: function (SearchBarService) {
            }
        });
}