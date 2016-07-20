export class LangNCurrencyController {
    constructor($translate, AftermarketConstants) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $translate });
        vm.languages = AftermarketConstants.localization;
        vm.languages.activeIndex = 0;

        //vm.toggleLang = indx => vm.languages.activeIndex = indx;
    }

    toggleLang(indx) {
        let vm = this;
        let {$translate} = vm.DI();
        vm.languages.activeIndex = indx;
        $translate.use(vm.languages[vm.languages.activeIndex].langName);
    }
}