export class EmailController {
    constructor($uibModalInstance, $document, $timeout, $scope, dataServices, url) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $uibModalInstance, $timeout, $scope, dataServices, url });

        setTimeout(() => {
            $document[0].getElementById("toEmails").multiple = true;
        }, 2000);

        vm.subject = "The following product has been shared with you.";
        vm.body = "has shared this product with you : " + url;
    }

    send() {
        let vm = this;
        let {$uibModalInstance, $timeout, $scope, dataServices, url} = vm.DI();
        vm.body = vm.from + " " + vm.body;
        let recipients = vm.to.split(",");
        dataServices.emailPart(url, vm.from, recipients, vm.subject, vm.body).then((response) => {
            $scope.$emit("showLoading", true);
            if (response.success) {
                $scope.$emit("showLoading", false);
                vm.showSuccess = true;
                $timeout(() => {
                    $uibModalInstance.close();
                }, 2000);
            }
        }, (error) => {

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
