/*Author : Shaifali Jaiswal*/
export class ShareConfirmationController {
    constructor($stateParams, $scope,dataServices, SearchBarService, OrderListService,$uibModalInstance, $translate) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({$stateParams, $scope, dataServices, OrderListService,$uibModalInstance});
         $scope.orderId  = OrderListService.orderId;
       $scope.quantity  = OrderListService.orderList.length;

       $scope.cancel = function(){
            $uibModalInstance.close();
        }

    }
  
}
