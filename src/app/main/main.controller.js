export class MainController {
    constructor($scope, $timeout, $log, $document, $window) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $scope, $timeout, $log, $document });

        vm.landscape = true;

        $scope.$on("searchbarFocussed", function () {
            vm.addOpaqueOverlay();
        });

        $scope.$on("searchbarBlurred", function () {
            vm.putOverlay = false;
        });

        if ($window.innerHeight > $window.innerWidth) {
            vm.landscape = false;
        }
        /*angular.element($window).bind('resize', function () {
            console.log("resized");
            console.log($window.innerHeight);
            console.log($window.innerWidth);
            if ($window.innerHeight > $window.innerWidth) {
                console.log("true");
                vm.landscape = false;
            }
            else {
                vm.landscape = true;
            }
            $scope.$apply();
        })*/

    }


    addOpaqueOverlay() {
        //var mc = angular.element(('#main-content')).css("color");
        var vm = this;
        let {$timeout, $log, $document} = vm.DI();
        //this.DI.timeout(function () {
        var mc = $document[0].getElementById('main-content');
        var mcHeight = mc.offsetHeight;
        vm.putOverlay = true;
        $timeout(function () {
            var overlay = angular.element($document[0].getElementById('overlay'));
            $log.debug(overlay);
            overlay.css("height", mcHeight + 'px');
        });

        //});

    }
}
