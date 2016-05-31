/*Author : Shaifali Jaiswal*/
export class OrderListController {
    constructor( $uibModal, $log) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $uibModal, $log });

        // vm.items = ['item1', 'item2', 'item3'];
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
