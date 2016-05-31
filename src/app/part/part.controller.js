/*Author:Rohit Rane*/
export class PartController {
    constructor($log, $document, $stateParams, $scope, $timeout, $window, $sce, SearchBarService, dataServices, SmoothScrollService) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $document, $scope, $stateParams, $window, $sce, SearchBarService, dataServices, SmoothScrollService });

        $window.scrollTo(0, 0);

        vm.getPart();
        $timeout(function () {
            $scope.$emit("searchbarBlurred");
        });

        let actvPic = $document[0].getElementById("active-pic");

        vm.containerDimensions = {
            height: actvPic.offsetHeight,
            width: actvPic.offsetWidth
        }

        $log.debug("Container Dimension :", vm.containerDimensions);

        vm.lensDimensions = {
            height: 80,
            width: 80
        };

        vm.hideForNow = true;

        angular.element($window).bind('resize', () => {
            vm._resizeImage();
        });

    }

    getPart() {
        let vm = this;
        let {$log, $stateParams, $scope, SearchBarService, dataServices} = vm.DI();
        $log.debug("part no :", $stateParams);
        vm.productLine = SearchBarService.productLine;
        $log.debug("state type :", $stateParams.type);
        $scope.$emit("showLoading", true);
        if ($stateParams.type === "partnum") {
            $log.debug("searching by part num.");
            dataServices.partByPartNum($stateParams.val).then(function (response) {
                $log.debug("Response in Controller :", response);
                vm.partData = response;
                vm._createCompatibilityTab();
                vm._createInterchangesTab();
                $scope.$emit("showLoading", false);
            }, function (error) {
                $scope.$emit("showLoading", false);
            });
        } else {
            dataServices.part($stateParams.id).then(function (response) {
                $log.debug("Response in Controller :", response);
                vm.partData = response;
                let retUrl = "http://placehold.it/1000x1000/dbdbdb/0099CC/?text=NO+IMAGE";
                switch (vm.partData.categories[2].name) {
                    case 'Flanges': console.log("It's a flanges"); vm.partData.imageUrl = "/assets/images/flange.png"; break;
                    case 'Universal Joints': console.log("It's a Universal Jt"); vm.partData.imageUrl = "/assets/images/u-joint.jpg"; vm.partData.modelDiagram = "assets/images/model_diagram.gif"; break;
                    case 'Flange Yoke': console.log("It's a Universal Jt"); vm.partData.imageUrl = "/assets/images/flange_yoke.jpg"; break;
                    case 'Ring and Pinions': console.log("It's a Universal Jt"); vm.partData.imageUrl = "/assets/images/rangeNpinion.jpg"; break;
                    default: vm.partData.imageUrl = retUrl;
                };
                vm._createCompatibilityTab();
                vm._createInterchangesTab();
                $scope.$emit("showLoading", false);
            }, function (error) {
                $scope.$emit("showLoading", false);
            });
        }
    }

    hasSpecification(attrs) {
        if (attrs) {
            let attrsArr = Object.keys(attrs);
            if (attrsArr.length === 0) {
                return false;
            }
            else return true
        } else return false;
    }

    hasCompatibility(apps) {
        if (apps) {
            let attrsArr = Object.keys(apps);
            if (attrsArr.length === 0) {
                return false;
            }
            else return true
        } else return false;
    }

    hasInterchanges(apps) {
        if (apps) {
            let attrsArr = Object.keys(apps);
            if (attrsArr.length === 0) {
                return false;
            }
            else return true
        } else return false;
    }

    goToSection(name) {
        let vm = this, {SmoothScrollService, $document} = vm.DI();
        SmoothScrollService.scrollTo(name);
    }

    _createCompatibilityTab() {
        let vm = this;

        vm.ymmCompatibilityTab1 = [], vm.ymmCompatibilityTab2 = [];

        angular.forEach(vm.partData.apps, (ymm, index, compArr) => {
            (index < Math.ceil(compArr.length / 2)) ? vm.ymmCompatibilityTab1.push(ymm) : vm.ymmCompatibilityTab2.push(ymm);
        });
    }

    _createInterchangesTab() {
        let vm = this;

        vm.ymmInterTab1 = [], vm.ymmInterTab2 = [];

        angular.forEach(vm.partData.interchanges, (ymm, index, compArr) => {
            (index < Math.ceil(compArr.length / 2)) ? vm.ymmInterTab1.push(ymm) : vm.ymmInterTab2.push(ymm);
        });
    }
    _resizeImage() {
        let vm = this,
            { $document } = vm.DI();
        let actvPic = $document[0].getElementById("active-pic");

        console.log("Resizing image");

        vm.containerDimensions = {
            height: actvPic.offsetHeight,
            width: actvPic.offsetWidth
        }

        console.log("container Dimensions :", vm.containerDimensions);

    }
}