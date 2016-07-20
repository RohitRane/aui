export function searchBarDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/search-bar/search-bar.html',
        scope: {
            creationDate: '='
        },
        controller: 'SearchBarController',
        controllerAs: 'searchBar',
        bindToController: true,
        replace:true
    };

    return directive;
}