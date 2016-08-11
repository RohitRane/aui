export function interChangeSearchDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/menus/interchange-search/interchange-search.html',
        controller: 'interChangeSearchController',
        controllerAs: 'incs',
        bindToController: true,
        replace:true
    };

    return directive;
}
