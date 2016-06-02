/*Author : Shaifali Jaiswal*/
export class ShareOrderlistController {
    constructor($uibModalInstance, items, dataServices, SearchBarService, OrderListService) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({$uibModalInstance});
        console.log("OrderListService.orderList ", OrderListService.orderList);
    }

    cancel() {
      let vm = this,
      {$uibModalInstance} = vm.DI();
      $uibModalInstance.close();
    }

    shareOrderList(){
      let vm = this,
      { dataServices, SearchBarService, OrderListService } = vm.DI();
      let payload = {
        "uuid": OrderListService.orderId,
        "fromFirstName": vm.fName,
        "fromLastName": vm.lName,
        "fromEmail": vm.fEmail,
        "description": vm.text,
        "sendTo": [vm.tEmail],
        "orderParts": OrderListService.orderList
      };
      dataServices.shareList(payload).then(function (response) {
            OrderListService.orderId = response;
        }, function (error) {
      });
    }
}
