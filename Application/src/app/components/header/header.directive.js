export function pageHeaderDirective($log, $window) {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/header.html',
        scope: {
            creationDate: '='
        },
        controller: 'PageHeaderController',
        controllerAs: 'vm',
        bindToController: true,
        link: function (scope, element) {
            let navbar = element.children().children()[0];
            let navbarOriginalHgt = navbar.offsetHeight;
            angular.element($window).bind("scroll", function () {
                if (this.pageYOffset >= navbarOriginalHgt) {
                    scope.sticky = true;
                } else {
                    scope.sticky = false;
                }
                scope.$apply();
            });
        }
    };

    return directive;
}