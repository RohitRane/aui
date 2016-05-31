/*Author : Shaifali Jaiswal*/
export class OrderListController {
    constructor( $uibModal, $log, OrderListService) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $uibModal, $log, OrderListService });

        // vm.items = ['item1', 'item2', 'item3'];
        vm.getOrderList();
   	}

    getOrderList(){
      let vm = this;
      let {$log, $uibModal, OrderListService} = vm.DI();
      vm.orderList = OrderListService.orderList;
    }
    
    remove(index){
      let vm = this;
      let {$log, $uibModal, OrderListService} = vm.DI();
      //OrderListService.orderList.pop(OrderListService.orderList[id]);
      OrderListService.orderList.splice(index,1);
      vm.orderList = OrderListService.orderList;
    }

    edit(part, qty){
      let vm = this;
      let {$log, $uibModal, OrderListService} = vm.DI();
      console.log("this.part 1",part, qty);
    }

   	open(){
   		let vm = this, size ="md";
   		let {$log, $uibModal} = vm.DI();
   		var modalInstance = $uibModal.open({
                templateUrl: 'app/orderList/shareOrderList/shareOrderList.html',
                controller: 'ShareOrderlistController',
                // templateUrl: 'app/orderList/ShareError/shareError.html',
                // controller: 'ShareErrorController',
                size: size,
                windowClass: 'my-modal-popup',
                resolve: {
                    items: function() {
                        return vm.items;
                    }
                }
            });

            // modalInstance.result.then(function(selectedItem) {
            //     vm.selected = selectedItem;
            // }, function() {
            //     $log.info('Modal dismissed at: ' + new Date());
            // });
   	}
}
