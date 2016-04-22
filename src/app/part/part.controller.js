/*Author:Rohit Rane*/
export class PartController {
    constructor($log, $document, $stateParams, $scope, $timeout, SearchBarService, dataServices) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $document, $stateParams, SearchBarService, dataServices });

        vm.getPart();
        $timeout(function () {
            $scope.$emit("searchbarBlurred");
        });

        vm.lensDimensions = {
            height: 80,
            width: 80
        };

    }

    getPart() {
        let vm = this;
        let {$log, $stateParams, SearchBarService, dataServices} = vm.DI();
        $log.debug("Part No :", SearchBarService.productLine);
        vm.productLine = SearchBarService.productLine;
        dataServices.part($stateParams.partNumber).then(function (response) {
            $log.debug("Response in Controller :", response.attrs);
            vm.partData = response;
        }, function (error) {
            $log.debug("Error in response :", error);
        });
    }
}