export function categoryMenuDirective() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/menus/categories/categories.html',
        /*scope: {
            //creationDate: '='
        },*/
        controller: 'CategoryMenuController',
        controllerAs: 'categoryMenu',
        bindToController: true,
        replace: true
    };

    return directive;
}

