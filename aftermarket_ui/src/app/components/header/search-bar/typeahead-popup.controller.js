export class TypeaheadPopupController {
    constructor($log, $translate) {
        'ngInject';

        let vm = this;
        //Add all the DI this the vm model so that u can use them in the controller functions.
        vm.DI = {
            log: $log
        };

        $log.debug("ello");
        vm.logger = $log;
        
    }
}