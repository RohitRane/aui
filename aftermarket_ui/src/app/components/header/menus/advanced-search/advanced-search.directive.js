export function advncdSrchDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/menus/advanced-search/advanced-search.html',
        controller: 'AdvancedSearchController',
        controllerAs: 'asc',
        bindToController: true,
        replace:true
    };

    return directive;
}
