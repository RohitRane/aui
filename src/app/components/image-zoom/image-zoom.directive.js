export function imageZoomDirective($log) {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/image-zoom/image-zoom.html',
        scope: {
            //creationDate: '='
        },
        controller: 'ImageZoomController',
        controllerAs: 'imgZoom',
        bindToController: true,
        link: function () {
            $log.debug("image zoom.");
            
        }
    };

    return directive;
}