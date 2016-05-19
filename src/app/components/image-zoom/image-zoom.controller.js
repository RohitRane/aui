/*
    Author : Rohit Rane
*/
export class ImageZoomController {
    constructor($log, $document) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $document });

        vm.showZoom = false;

        vm.containerDimensions = angular.fromJson(vm.containerDimensions);
        let activeImg = $document[0].getElementById("active-img");
        angular.element(activeImg).css("width", vm.containerDimensions.width - 8 + "px");
        angular.element(activeImg).css("height", vm.containerDimensions.height - 4 + "px");
        
        vm.zoomLevel = vm.zoomIndex;

    }
    enlarge(event) {
        let vm = this;
        let {$document} = vm.DI();
        vm.showZoom = true;
        console.log("eeeevvvvvvvvvvvttttttttttttttt :", event);
        if (angular.isUndefined(event)) {
            console.log("null evnt");
            event = vm.event;
        } else {
            vm.event = event;
        }

        let zoomLevel = vm.zoomIndex;
        //console.log("z index  in enlarge :", vm.zoomIndex);
        let imgUrl = vm.src;

        let activeImg = $document[0].getElementById("active-img");
        let crossSection = angular.fromJson(vm.lensDimensions);
        crossSection.yOffset = 315;
        crossSection.xOffset = 60;
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
        let {$document} = vm.DI();
        let lens = $document[0].getElementById("lens");
        let lensElement = angular.element(lens);

        lensElement.css("height", (crossSection.height*(vm.zoomLevel/vm.zoomIndex)) + 'px');
        lensElement.css("width", (crossSection.width*(vm.zoomLevel/vm.zoomIndex)) + 'px');
        lensElement.css("top", lensCenterY + 'px');
        lensElement.css("left", lensCenterX + 'px');
        let activeImg = $document[0].getElementById("active-img");
        (lensCenterX + crossSection.width - 10 > activeImg.offsetWidth || lensCenterX + crossSection.xOffset / 2 < angular.element(activeImg)[0].getBoundingClientRect().left) ? vm.showZoom = false : angular.noop();
        lensCenterY + crossSection.height > activeImg.offsetHeight ? vm.showZoom = false : angular.noop();

    }

    mouseleft() {
        let vm = this;
        vm.showZoom = false;
    }

    _mouseWheelHandler(e) {
        e.preventDefault();
        let vm = this;
        console.log("V M : ", vm);
        console.log("Mouse Wheeled ..........................!!!!!!!!!!!!!!!!!!!!!!!1", e.deltaX, e.deltaY);
        console.log("z index before :", vm.zoomIndex);
        if (e.deltaY > 0) {
            vm.zoomIndex++;
            console.log("z index :", vm.zoomIndex);
        } else {
            console.log("z index :", vm.zoomIndex);
        }

    }

    /*Attach the below function to ng-mouseover event*/
    zoomInOrOut() {
        //console.log('Muhahahaha');
        let vm = this;
        let {$document} = vm.DI();
        //Mouse wheel event
        let lens = $document[0].getElementById("lens");
        angular.element(lens).on("wheel", function (e) {
            e.preventDefault();
            //console.log("V M : ", vm);
            //console.log("Mouse Wheeled ..........................!!!!!!!!!!!!!!!!!!!!!!!1", e.deltaX, e.deltaY);
            //console.log("z index before :", vm.zoomIndex);
            if (e.deltaY > 0) {
                vm.zoomIndex++;
                //console.log("z index :", vm.zoomIndex);
            } else {
                vm.zoomIndex--;
                //console.log("z index :", vm.zoomIndex);
            }
            vm.enlarge();
        });
        /*if (lens.addEventListener) {
            // IE9, Chrome, Safari, Opera
            lens.addEventListener("mousewheel", vm._mouseWheelHandler(vm), false);
            // Firefox
            lens.addEventListener("DOMMouseScroll", vm._mouseWheelHandler, false);
        }
        // IE 6/7/8
        else lens.attachEvent("onmousewheel", vm._mouseWheelHandler);*/
    }
}

function generateBgString(imgUrl, startX, startY, zoomedImgHgt, zoomedImgWdt) {
    return "url(" + imgUrl + ") " + startX + "px" + " " + startY + "px/" + zoomedImgWdt + "px " + zoomedImgHgt + "px " + "no-repeat";
}
