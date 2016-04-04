export function imageZoomDirective($log, $window) {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/image-zoom/image-zoom.html',
        scope: {
            //creationDate: '='
        },
        //controller: 'ImageZoomController',
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