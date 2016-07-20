export class PageHeaderController {
    constructor($rootScope, $timeout, $document, AftermarketConstants, $location, $scope, SearchBarService, $translate) {
        'ngInject';
        let vm = this;
        // vm.localizationRoot = "HEADER.";
        vm.DI = () => ({ $location, SearchBarService, $scope });
        vm.websiteLogo = AftermarketConstants.skin.logo;
        $rootScope.$on("realignMegaMenu", () => {
            $timeout(() => {
                let hiddenLeft = $document[0].getElementById('hidden-left');
                angular.element(hiddenLeft).css("float","left");
            }, 150);
        });
    }

    go() {
        let vm = this;
        let { $location, SearchBarService, $scope } = vm.DI();
        $scope.$emit("reachedhome");
    }
}