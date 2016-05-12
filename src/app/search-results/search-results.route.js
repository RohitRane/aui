export function routerConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('searchResults', {
            url: '/search',
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