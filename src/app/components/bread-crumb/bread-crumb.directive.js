/*Author:Rohit Rane*/

export function breadCrumbDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/bread-crumb/bread-crumb.html',
        scope: {
            resultSetLimit: '@resultSetLimit',
            totalResults: '@totalResults',
            resultLength: '@resultLength',
            selMainCategory: '@selMainCategory',
            searchString: '@searchString',
            categories: '=categories',
            partNo:'@partNo'
        },
        controller: 'BreadCrumbController',
        controllerAs: 'bc',
        bindToController: true
    };

    return directive;
}