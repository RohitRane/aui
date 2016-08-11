export function imgProtectorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            elem.bind('contextmenu', function (event) {
                scope.$apply(function () {
                    event.preventDefault();
                });
            });
        }
    };

    return directive;
}