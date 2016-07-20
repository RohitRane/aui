export class EmailController {
    constructor( $uibModalInstance, $rootScope, $document, $timeout, $scope, dataServices, url, $log, $translate) {
        'ngInject';
        let vm = this;
        vm.showSending = false;
        vm.DI = () => ({ $uibModalInstance, $timeout, $scope, $log, $rootScope, dataServices, url });
        setTimeout(() => {
            $document[0].getElementById("toEmails").multiple = true;
        }, 2000);

        vm.subject = "The following product has been shared with you.";
        vm.body = "has shared this part with you : ";
    }

    send() {
        let vm = this;
        let {$uibModalInstance, $timeout, $scope, dataServices, url} = vm.DI();
        vm.body = vm.from + " " + vm.body;
        let recipients = vm.to.split(",");
        //$scope.$emit("showSending", true);
        vm.showSending = true;
        dataServices.emailPart(url, vm.from, recipients, vm.subject, vm.body).then((response) => {
            
            if (response.success) {
                vm.showSending = false;
                //$scope.$emit("showLoading", false);
                vm.showSuccess = true;
                $timeout(() => {
                    $uibModalInstance.close();
                }, 2000);
            }
        }, (error) => {
            vm.showSending = false;
        });
    }
    cancel() {
        let vm = this,
            {
                $uibModalInstance
            } = vm.DI();
        $uibModalInstance.close();
    }
}
