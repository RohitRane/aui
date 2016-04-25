export class PageHeaderController {
    constructor(AftermarketConstants) {
        'ngInject';
        let vm = this;
        vm.websiteLogo = AftermarketConstants.skin.logo;
    }
}