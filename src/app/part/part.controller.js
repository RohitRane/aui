/*Author:Rohit Rane*/
export class PartController {
    constructor($log, $document, $stateParams, $scope, $timeout, $window, SearchBarService, dataServices) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $document, $scope, $stateParams, SearchBarService, dataServices });

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
                $scope.$emit("showLoading", false);
            }, function (error) {
                $scope.$emit("showLoading", false);
            });
        } else {
            dataServices.part($stateParams.id).then(function (response) {
                $log.debug("Response in Controller :", response);
                vm.partData = response;
                switch (vm.partData.categories[2]) {
                    case 'Flanges': console.log("It's a flanges"); vm.partData.imageUrl = "/assets/images/flange.png"; break;
                    case 'Universal Joints': console.log("It's a Universal Jt"); vm.partData.imageUrl = "/assets/images/u-joint.jpg"; break;
                    case 'Flange Yoke': console.log("It's a Universal Jt"); vm.partData.imageUrl = "/assets/images/flange_yoke.jpg"; break;
                    case 'Ring and Pinions': console.log("It's a Universal Jt"); vm.partData.imageUrl = "/assets/images/rangeNpinion.jpg"; break;
                    default: vm.partData.imageUrl = "http://placehold.it/160x160/dbdbdb/0099CC/?text=NO+IMAGE";
                };
                vm._createCompatibilityTab();
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

    _createCompatibilityTab() {
        let vm = this;
        vm.ymmCompatibility = [
            {
                'year': 2007,
                'make': 'Ford',
                'model': 'E-150'
            },
            {
                'year': 2006,
                'make': 'Ford',
                'model': 'E-250'
            },
            {
                'year': 2008,
                'make': 'Ford',
                'model': 'E-150'
            },
            {
                'year': 2009,
                'make': 'Ford',
                'model': 'E-250'
            },
            {
                'year': 1979,
                'make': 'Chevrolet',
                'model': 'P30'
            }
        ];

        vm.ymmCompatibilityTab1 = [], vm.ymmCompatibilityTab2 = [];

        console.log("part dta :", vm.partData.apps);

        angular.forEach(vm.partData.apps, (ymm, index, compArr) => {
            (index < Math.ceil(compArr.length / 2)) ? vm.ymmCompatibilityTab1.push(ymm) : vm.ymmCompatibilityTab2.push(ymm);
        });
    }
}