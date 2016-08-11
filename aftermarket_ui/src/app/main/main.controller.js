export class MainController {
    constructor($scope, $rootScope, $state, $timeout, $interval, $log, $document, $window, BreadCrumbService, dataServices, appInfoService) {
        'ngInject';

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.clear();
        })
        $interval(() => {
            console.clear();
        }, 60000);

        let vm = this;
        vm.DI = () => ({ $scope, $timeout, $log, $document });

        vm.landscape = true;

        /*$scope.$on("searchbarFocussed", function () {
            vm.addOpaqueOverlay();
        });

        $scope.$on("searchbarBlurred", function () {
            vm.putOverlay = false;
        });*/

        if ($window.innerHeight > $window.innerWidth) {
            vm.landscape = false;
        }
        $window.onscroll = function (ev) {
            if (($window.innerHeight + $window.scrollY) >= $document[0].body.offsetHeight - 90) {
                // you're at the bottom of the page
                let bottomOffset = $document[0].body.offsetHeight - ($window.innerHeight + $window.scrollY);
                $rootScope.$emit("isHeaderSticky", { bottomOffset: bottomOffset, state: true });
            } else {
                $rootScope.$emit("isHeaderSticky", { state: true });
            }
        };

        dataServices.appInfo().then(response => {
            appInfoService.appInfo = response;
        }, error => {

        });

        let showTree = $rootScope.$on("showOnlyTreeInBC", (evt, status) => {
            BreadCrumbService.showOnlyTree = status;
        });

        $rootScope.$on("$destroy", () => {
            showTree();
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
            overlay.css("height", mcHeight + 'px');
        });

        //});

    }

    clearOpaqueOverlay() {
        let vm = this;
        vm.putOverlay = false;
    }
}
