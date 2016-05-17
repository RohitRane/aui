export function pageHeaderDirective($log, $window, $rootScope) {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/header.html',
        scope: {
            creationDate: '='
        },
        controller: 'PageHeaderController',
        controllerAs: 'pgHdr',
        bindToController: true,
        link: function (scope, element) {
            let navbar = element.children().children()[0];
            let navbarOriginalHgt = navbar.offsetHeight;
            angular.element($window).bind("scroll", function () {
                if (this.pageYOffset >= navbarOriginalHgt) {
                    if (!scope.sticky) {
                        $rootScope.$emit("isHeaderSticky", { state: true });
                    }
                    scope.sticky = true;

                } else {
                    scope.sticky = false;
                    $rootScope.$emit("isHeaderSticky", { state: false });
                }
                scope.$apply();
            });
        }
    };

    return directive;
}