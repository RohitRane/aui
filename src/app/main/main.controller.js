export class MainController {
    constructor($scope, $rootScope, $state, $timeout, $log, $document, $window, BreadCrumbService) {
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
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            $log.debug("From : ", from);
            $log.debug("To : ", to);
            if (from.name === "searchResults" && to.name === "part" && $state.is('part')) {
                $log.debug("travelling from search res to part.", vm);
                BreadCrumbService.searchToResults = true;
            } else {
                BreadCrumbService.searchToResults = false;
            }
        });


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
