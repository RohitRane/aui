/*Author : Shaifali Jaiswal*/
export class CopyOrderListURLController {
    constructor($scope, $timeout, dataServices, SearchBarService, OrderListService, $uibModalInstance, OrderlistModalFactory) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({
            $scope, $timeout, $uibModalInstance, dataServices, OrderListService, OrderlistModalFactory
        });
        $scope.shareURL = location.host + "/" + "sharedOrderList/" + OrderListService.orderId;
 $scope.orderId  = OrderListService.orderId;
       $scope.quantity  = OrderListService.orderList.length;

        //let vm1 = this;
        //{ OrderlistModalFactory} = vm1.DI();
        vm.copySelectionText = function() {
            var emailfield = document.querySelector("#shreURL")
            emailfield.focus() // this is necessary in most browsers before setSelectionRange() will work
            emailfield.setSelectionRange(0, emailfield.value.length) // select the 5th to last characters of input field

            if (emailfield.length > 0)
                document.execCommand("copy");
            $uibModalInstance.close();
            let urlModalInstance = $timeout(OrderlistModalFactory.open("lg", "app/orderList/ShareCopyUrl/shareUrl.html", "ShareUrlController", "shareUrl"), 2000);

        }

        vm.clipCopyHandler = function() {
            //let vm = this;
            //{ $timeout,OrderlistModalFactory} = vm.DI();

        }
    }
    cancel() {}
}