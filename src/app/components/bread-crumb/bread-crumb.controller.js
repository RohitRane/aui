/*Author:Rohit Rane*/

export class BreadCrumbController {
    constructor($log, $timeout) {
        'ngInject';

        let vm = this;
        $log.debug("bcC :", vm);
        $timeout(function () {
            $log.debug("bcC 2:", vm);
        },2000);
    }
}