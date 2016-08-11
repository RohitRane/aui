export class PageHeaderController {
    constructor($rootScope, $timeout, $state, $document, AftermarketConstants, $location, $scope, SearchBarService, $translate) {
        'ngInject';
        let vm = this;
        // vm.localizationRoot = "HEADER.";
        vm.DI = () => ({ $location, SearchBarService, $scope, $rootScope });
        vm.websiteLogo = AftermarketConstants.skin.logo;
        $rootScope.$on("realignMegaMenu", () => {
            $timeout(() => {
                let hiddenLeft = $document[0].getElementById('hidden-left');
                angular.element(hiddenLeft).css("float", "left");
            }, 150);
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            vm.isHomePage = toState.name === "home" ? true : false;
        })
        vm.isHomePage = $state.is("home") ? true : false;
    }

    go() {
        let vm = this;
        let { $location, SearchBarService, $scope, $state, $rootScope } = vm.DI();
        $scope.$emit("reachedhome");
        $rootScope.$emit("$resetYMM");
        $rootScope.$emit('$resetAdvancedSearch');
    }
}