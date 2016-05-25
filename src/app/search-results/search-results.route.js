export function routerConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('searchResults', {
            url: '/search?mode&cat1&cat2&cat3',
            parent: 'aftermarket',
            templateUrl: 'app/search-results/search-results.html',
            controller: 'SearchResultsController',
            controllerAs: 'srchRes',
            resolve: {},
            onEnter: function(SearchBarService){  
            	console.log("Back onEnter");
            },
            onExit: function(SearchBarService){  
            	console.log("Back onExit");
            }
        });
}