/*Author:Rohit Rane*/
export class HomeController {
    constructor($rootScope, $scope, $window, AftermarketConstants, SearchBarService) {
        'ngInject';
        let vm = this;
        $window.scrollTo(0, 0);
        vm.dummyHome = AftermarketConstants.skin.home;
        
        SearchBarService.clearSession();

        $rootScope.$emit("reachedhome");
    }
}