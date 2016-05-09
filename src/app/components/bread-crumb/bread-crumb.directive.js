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
            productLine: '@productLine',
            searchString: '@searchString'
        },
        controller: 'BreadCrumbController',
        controllerAs: 'bc',
        bindToController: true
    };

    return directive;
}