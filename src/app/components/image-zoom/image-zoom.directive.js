export function imageZoomDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/image-zoom/image-zoom.html',
        scope: {
            src: '@src',
            zoomIndex: '@zoomIndex',
            lensDimensions: '@lensDimensions',
            containerDimensions: '@containerDimensions'
        },
        controller: 'ImageZoomController',
        controllerAs: 'imgZoom',
        bindToController: true
    };

    return directive;
}