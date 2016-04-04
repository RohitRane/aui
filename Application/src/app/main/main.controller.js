export class MainController {
    constructor($scope, $timeout, $log, $document, webDevTec, toastr) {
        'ngInject';
        let vm = this;
        vm.DI = {
            scope:$scope,
            log: $log,
            timeout: $timeout,
            document: $document
        };
        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1458569030841;
        vm.toastr = toastr;
        vm.putOverlay = false;

        vm.activate($timeout, webDevTec);
        
        $scope.$on("searchbarFocussed",function () {
            vm.addOpaqueOverlay();
        });
        
        $scope.$on("searchbarBlurred",function () {
            vm.putOverlay = false;
        });
    }

    activate($timeout, webDevTec) {
        this.getWebDevTec(webDevTec);
        $timeout(() => {
            this.classAnimation = 'rubberBand';
        }, 4000);
    }

    getWebDevTec(webDevTec) {
        this.awesomeThings = webDevTec.getTec();

        angular.forEach(this.awesomeThings, (awesomeThing) => {
            awesomeThing.rank = Math.random();
        });
    }

    showToastr() {
        this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
        this.classAnimation = '';
    }
    
    addOpaqueOverlay() {
        //var mc = angular.element(('#main-content')).css("color");
        var vm = this;
        this.DI.timeout(function () {
            var mc = angular.element(vm.DI.document[0].getElementById('main-content'));
            var mcHeight = mc[0].offsetHeight;
            vm.putOverlay = true;
            vm.DI.timeout(function () {
                var overlay = angular.element(vm.DI.document[0].getElementById('overlay'));
                vm.DI.log.debug(overlay);
                overlay.css("height", mcHeight+'px');
            });

        });

    }
}
