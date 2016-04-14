/*
    Author : Rohit Rane
*/
export class ImageZoomController {
    constructor($log, $document, $timeout) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({$log, $document, $timeout});

        vm.showZoom = false;
    }
    enlarge(event) {
        let vm = this;
        let {$document} = vm.DI();
        vm.showZoom = true;
        let zoomLevel = 5;
        let imgUrl = "assets/images/u-joint.jpg";
        let crossSection = {
            height: 80,
            width: 80
        };
        
        let activeImg = $document[0].getElementById("active-img");
        //$log.debug("id :", activeImg);
        
        //$log.debug("mouse over :", event.clientY);
        let lens = $document[0].getElementById("lens");
        let lensElement = angular.element(lens);
        //$log.debug("lens :", lensElement);
        let lensCenterY = event.clientY - 180;
        let lensCenterX = event.clientX -40;
        lensCenterX < 0 ? lensCenterX = 0 : angular.noop();
        lensCenterY < 0 ? lensCenterY = 0 : angular.noop();
        lensCenterX+crossSection.width > activeImg.offsetWidth ? vm.showZoom = false : angular.noop();
        lensCenterY+crossSection.height > activeImg.offsetHeight ? vm.showZoom = false : angular.noop();
        
        lensElement.css("top", lensCenterY + 'px');
        lensElement.css("left", lensCenterX + 'px');
        //$log.debug("top :", lensElement.css("top"));


        let zoom = $document[0].getElementById("zoom");
        let zoomElement = angular.element(zoom);
        zoomElement.css("height", crossSection.height * zoomLevel + "px");
        zoomElement.css("width", crossSection.width * zoomLevel + "px");
        //$log.debug("zoom :", zoomElement);

        let startX = -lensCenterX * zoomLevel;
        let startY = -(lensCenterY) * zoomLevel;
        
        let zoomedImgHgt = activeImg.offsetHeight * zoomLevel;
        let zoomedImgWdt = activeImg.offsetWidth * zoomLevel;
        //$log.debug("ht :", zoomedImgHgt);

        zoomElement.css("background", generateBgString(imgUrl, startX, startY, zoomedImgHgt, zoomedImgWdt));
    }
}

function generateBgString(imgUrl, startX, startY, zoomedImgHgt, zoomedImgWdt) {
    return "url(" + imgUrl + ") " + startX + "px" + " " + startY + "px/" + zoomedImgWdt + "px " + zoomedImgHgt + "px " + "no-repeat";
}