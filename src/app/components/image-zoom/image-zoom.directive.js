export function imageZoomDirective($log) {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/image-zoom/image-zoom.html',
        scope: {
            src: '@src'
        },
        controller: 'ImageZoomController',
        controllerAs: 'imgZoom',
        bindToController: true,
        link: function (scope, elem, attr) {
            $log.debug("Attr :",attr);
            $log.debug("scope :",scope);
            
        }
    };

    return directive;
}