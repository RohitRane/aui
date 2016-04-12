export class MainController {
    constructor($scope, $timeout, $log, $document) {
        'ngInject';
        let vm = this;
        vm.DI = ()=> ({$scope, $timeout, $log, $document});

        
        $scope.$on("searchbarFocussed",function () {
            vm.addOpaqueOverlay();
        });
        
        $scope.$on("searchbarBlurred",function () {
            vm.putOverlay = false;
        });
    }

      
    addOpaqueOverlay() {
        //var mc = angular.element(('#main-content')).css("color");
        var vm = this;
        let {$timeout, $log, $document} = vm.DI();
        //this.DI.timeout(function () {
            var mc =$document[0].getElementById('main-content');
            var mcHeight = mc.offsetHeight;
            vm.putOverlay = true;
            $timeout(function () {
                var overlay = angular.element($document[0].getElementById('overlay'));
                $log.debug(overlay);
                overlay.css("height", mcHeight+'px');
            });

        //});

    }
}
