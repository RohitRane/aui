export class SendingController {
    constructor($scope, $rootScope, $log, $translate) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $scope, $rootScope, $log });
        vm.sending = true;
        //vm.sending = false;
        /*$rootScope.$on('showSending', function(event, flag) {
            
        });*/
    }
}
