/*
    Author : Rohit Rane
*/
export class ImageZoomController {
    constructor($log, $document, $window) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $document, $window });

        vm.showZoom = false;

        vm.containerDimensions = angular.fromJson(vm.containerDimensions);
        let activeImg = $document[0].getElementById("active-img");
        angular.element(activeImg).css("width", vm.containerDimensions.width - 8 + "px");
        angular.element(activeImg).css("height", vm.containerDimensions.height - 4 + "px");

        /*let lens = $document[0].getElementById("lens");

        angular.element(activeImg).bind("mousemove",vm.enlarge(event));
        angular.element(activeImg).bind("mousemove",vm.enlarge(event));*/

        vm.zoomLevel = vm.zoomIndex;

        activeImg.onerror = function () {
            this.src = "http://placehold.it/1000x1000/dbdbdb/0099CC/?text=NO+IMAGE";
        }


    }
    enlarge(event) {
        let vm = this;
        let {$document, $window} = vm.DI();
        vm.showZoom = true;
        if (angular.isUndefined(event)) {
            event = vm.event;
        } else {
            vm.event = event;
        }

        let zoomLevel = vm.zoomIndex;
        //console.log("z index  in enlarge :", vm.zoomIndex);
        let imgUrl = vm.src;

        let activeImg = $document[0].getElementById("active-img");
        let crossSection = angular.fromJson(vm.lensDimensions);
        //crossSection.yOffset = 315;
        //crossSection.xOffset = 60;
        let imgCont = $document[0].getElementById("img-container");
        let rect1 = activeImg.getBoundingClientRect();
        let rect2 = imgCont.getBoundingClientRect();
        crossSection.yOffset = rect2.top + $document[0].documentElement.scrollTop + crossSection.height / 2;
        crossSection.xOffset = rect2.left + crossSection.width / 2;
        //let cs = angular.element(activeImg).offset();

        /*if (activeImg) {
            let rect = activeImg.getBoundingClientRect();

            // Make sure element is not hidden (display: none) or disconnected
            if (rect.width || rect.height || activeImg.getClientRects().length) {
                crossSection.yOffset = rect.top + $window.pageYOffset - $document[0].clientTop;
                crossSection.xOffset = rect.left + $window.pageXOffset - $document[0].clientLeft;
            };
        }
        */


        let lensCenterY = event.pageY - crossSection.yOffset;//- vm.lensDimensions.height;
        let lensCenterX = event.pageX - crossSection.xOffset;//- vm.lensDimensions.width;
        vm.lensCenterY = lensCenterY;
        vm.lensCenterX = lensCenterX;
        lensCenterX < 0 ? lensCenterX = 0 : angular.noop();
        lensCenterY < 0 ? lensCenterY = 0 : angular.noop();
        lensCenterX + crossSection.width > activeImg.offsetWidth ? vm.showZoom = true : angular.noop();
        lensCenterY + crossSection.height > activeImg.offsetHeight ? vm.showZoom = true : angular.noop();

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

        lensElement.css("height", (crossSection.height * (vm.zoomLevel / vm.zoomIndex)) + 'px');
        lensElement.css("width", (crossSection.width * (vm.zoomLevel / vm.zoomIndex)) + 'px');
        lensElement.css("top", lensCenterY + 'px');
        lensElement.css("left", lensCenterX + 'px');
        let activeImg = $document[0].getElementById("active-img");
        (lensCenterX + crossSection.width - 10 > activeImg.offsetWidth /*|| lensCenterX + crossSection.xOffset / 2 < angular.element(activeImg)[0].getBoundingClientRect().left*/) ? vm.showZoom = false : angular.noop();
        lensCenterY + crossSection.height > activeImg.offsetHeight ? vm.showZoom = false : angular.noop();

    }

    mouseleft() {
        let vm = this;
        vm.showZoom = false;
    }

    _mouseWheelHandler(e) {
        e.preventDefault();
        let vm = this;
        if (e.deltaY > 0) {
            vm.zoomIndex++;
        } else {
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

    showZoomOrNot() {
        let vm = this;
        return angular.fromJson(vm.showZoomSection) && vm.showZoom;
    }

    preventRightClick(e){
        e.preventDefault();
    }
}

function generateBgString(imgUrl, startX, startY, zoomedImgHgt, zoomedImgWdt) {
    return "url(http://" + imgUrl + ") " + startX + "px" + " " + startY + "px/" + zoomedImgWdt + "px " + zoomedImgHgt + "px " + "no-repeat";
}
