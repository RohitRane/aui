export function pageHeaderDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/header.html',
        scope: {
            creationDate: '='
        },
        controller: 'PageHeaderController',
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}