/*Author : Shaifali Jaiswal*/
export class ShareOrderlistController {
    constructor($uibModalInstance, $location, items, dataServices, SearchBarService, OrderListService) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({$uibModalInstance, $location, dataServices, OrderListService});
        console.log("OrderListService.orderList ", OrderListService.orderList);
    }

    cancel() {
      let vm = this,
      {$uibModalInstance} = vm.DI();
      $uibModalInstance.close();
    }

    shareOrderList(){
      let vm = this,
      { $location, dataServices, SearchBarService, OrderListService } = vm.DI();
      console.log(OrderListService.orderList);
      let temp = OrderListService.orderList;
      let orderList = temp.map(function (list) {
        return {
            "partNumber": list.partNumber,
            "quantity": list.qty,
            "partCategory": list.LOB,
            "partName": list.partDesc
        }
      });

      let payload = {
        "uuid": OrderListService.orderId,
        "fromFirstName": vm.fName,
        "fromLastName": vm.lName,
        "fromEmail": vm.fEmail,
        "description": vm.text,
        "sendTo": [vm.tEmail],
        "sharedURL": $location.absUrl(),
        "orderParts": orderList
      };
      dataServices.shareList(payload).then(function (response) {
            OrderListService.orderId = response;
            /* Once orderlist changed we should get new orderlist */
            dataServices.orderList().then(function (response) {
                  OrderListService.orderId = response;
                  sessionStorage.orderId = angular.toJson(response);
                  OrderListService.orderList = [];
              }, function (error) {
              });
        }, function (error) {
      });
    }
}
