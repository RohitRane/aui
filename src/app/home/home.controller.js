/*Author:Rohit Rane*/
export class HomeController {
    constructor($window, AftermarketConstants) {
        'ngInject';
        let vm = this;
        $window.scrollTo(0, 0);
        vm.dummyHome = AftermarketConstants.skin.home;
    }
}