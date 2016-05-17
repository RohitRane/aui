/*Author:Rohit Rane*/
export class PartController {
    constructor($log, $document, $stateParams, $scope, $timeout, $window, SearchBarService, dataServices) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $document, $stateParams, SearchBarService, dataServices });

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
        let {$log, $stateParams, SearchBarService, dataServices} = vm.DI();
        $log.debug("part no :", $stateParams);
        vm.productLine = SearchBarService.productLine;
        $log.debug("state type :", $stateParams.type);
        if ($stateParams.type === "partnum") {
            $log.debug("searching by part num.");
            dataServices.partByPartNum($stateParams.val).then(function (response) {
                $log.debug("Response in Controller :", response);
                vm.partData = response;
            }, function (error) {
                $log.debug("Error in response :", error);
            });
        } else {
            dataServices.part($stateParams.id).then(function (response) {
                $log.debug("Response in Controller :", response);
                vm.partData = response;
            }, function (error) {
                $log.debug("Error in response :", error);
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
}