/*Author:Rohit Rane*/
export class HomeController {
    constructor(AftermarketConstants) {
        'ngInject';
        let vm = this;
        vm.dummyHome = AftermarketConstants.skin.home;
    }
}