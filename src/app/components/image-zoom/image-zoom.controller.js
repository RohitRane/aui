/*
    Author : Rohit Rane
*/
export class ImageZoomController {
    constructor($log, $document, $timeout) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $document, $timeout });

        vm.showZoom = false;
    }
    enlarge(event) {
        let vm = this;
        let {$document, $log, $timeout} = vm.DI();
        vm.showZoom = true;

        let zoomLevel = vm.zoomIndex;
        let imgUrl = vm.src;

        let activeImg = $document[0].getElementById("active-img");
        $log.debug("mouse x :" + event.pageY + " " + event.pageX);
        let crossSection = JSON.parse(vm.lensDimensions);
        crossSection.yOffset= 315;
        crossSection.xOffset= 60;
        $log.debug("lens dim:", crossSection);
        let lensCenterY = event.pageY - crossSection.yOffset;
        let lensCenterX = event.pageX - crossSection.xOffset;
        vm.lensCenterY = lensCenterY;
        vm.lensCenterX = lensCenterX;
        lensCenterX < 0 ? lensCenterX = 0 : angular.noop();
        lensCenterY < 0 ? lensCenterY = 0 : angular.noop();
        lensCenterX + vm.lensDimensions.width > activeImg.offsetWidth ? vm.showZoom = false : angular.noop();
        lensCenterY + vm.lensDimensions.height > activeImg.offsetHeight ? vm.showZoom = false : angular.noop();

        vm.repositionLens(lensCenterX, lensCenterY, crossSection);

        let zoom = $document[0].getElementById("zoom");
        let zoomElement = angular.element(zoom);
        zoomElement.css("height", crossSection.height * zoomLevel + "px");
        zoomElement.css("width", crossSection.width * zoomLevel + "px");

        let startX = -lensCenterX * zoomLevel;
        let startY = -(lensCenterY) * zoomLevel;

        let zoomedImgHgt = activeImg.offsetHeight * zoomLevel;
        let zoomedImgWdt = activeImg.offsetWidth * zoomLevel;

        zoomElement.css("background", generateBgString(imgUrl, startX, startY, zoomedImgHgt, zoomedImgWdt));
    }

    repositionLens(lensCenterX, lensCenterY, crossSection) {
        let vm = this;
        let {$document, $log, $timeout} = vm.DI();
        $log.debug("lens reposition.", vm.lensDimensions);
        let lens = $document[0].getElementById("lens");
        let lensElement = angular.element(lens);
        
            lensElement.css("height", crossSection.height + 'px');
            lensElement.css("width", crossSection.width + 'px');
        lensElement.css("top", lensCenterY + 'px');
        lensElement.css("left", lensCenterX + 'px');
        let activeImg = $document[0].getElementById("active-img");
        (lensCenterX + crossSection.width-10 > activeImg.offsetWidth || lensCenterX+crossSection.xOffset/2 < angular.element(activeImg)[0].getBoundingClientRect().left ) ? vm.showZoom = false : angular.noop();
        lensCenterY + crossSection.height > activeImg.offsetHeight ? vm.showZoom = false : angular.noop();

    }

    mouseleft() {
        let vm = this;
        vm.showZoom = false;
    }
}

function generateBgString(imgUrl, startX, startY, zoomedImgHgt, zoomedImgWdt) {
    return "url(" + imgUrl + ") " + startX + "px" + " " + startY + "px/" + zoomedImgWdt + "px " + zoomedImgHgt + "px " + "no-repeat";
}
