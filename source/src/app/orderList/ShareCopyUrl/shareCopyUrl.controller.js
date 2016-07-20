/*Author : Shaifali Jaiswal*/
export class ShareUrlController{
    constructor($scope,$stateParams, dataServices, SearchBarService, OrderListService,$uibModalInstance) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({$scope,$stateParams, dataServices, OrderListService,$uibModalInstance});
        $scope.OrderId = OrderListService.orderId;
         $scope.Url = location.host + "/" + "sharedOrderList/" + OrderListService.orderId;
         $scope.quantity = OrderListService.orderList.length;
        //vm.blah="rivan";er

        $scope.cancel = function(){
        	$uibModalInstance.close();
        }
    }
}
