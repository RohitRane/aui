export function langNCurrencyDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/menus/lang-n-currency/lang-n-currency.html',
        /*scope: {
            //creationDate: '='
        },*/
        controller: LangNCurrencyController,
        controllerAs: 'lnc',
        bindToController: true,
        replace: true
    };

    return directive;
}

class LangNCurrencyController {
    constructor($log) {
        'ngInject';
        $log.debug("Running lng n curr controller.");
    }
}