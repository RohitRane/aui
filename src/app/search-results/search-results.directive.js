export function SearchResultDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/search-results.html',
        scope: {
            creationDate: '='
        },
        controller: 'SearchResultsController',
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}