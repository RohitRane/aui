export class SendingController {
    constructor($scope,$rootScope,$log, $translate) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $scope,$rootScope,$log });
        vm.sending = false;
    }
}
