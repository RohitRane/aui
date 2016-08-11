/*Author : Shaifali Jaiswal*/
export class OrderListController {
    constructor($uibModal, $log, OrderListService, $translate) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $uibModal, $log, OrderListService });
        // vm.items = ['item1', 'item2', 'item3'];
        //debugger;
        vm.getOrderList();
        vm.isOrderlistEnabled = () => OrderListService.orderList.length > 0 ? true : false;
        // debugger;
   	}

    getOrderList() {
        let vm = this;
        let {$log, $uibModal, OrderListService} = vm.DI();
        let storedOrderList = sessionStorage.orderList?angular.fromJson(sessionStorage.orderList):[];
        let emptyCheck = (OrderListService.orderList.length == 0 && storedOrderList.length == 0) ? true
            : false;
        vm.isOrderlistEnabled = () => emptyCheck ? true : false;
        if (OrderListService.orderList.length == 0 && storedOrderList.length == 0) return false;
        vm.orderId = OrderListService.orderId;
        vm.orderList = OrderListService.orderList = angular.fromJson(sessionStorage.orderList);
    }

    remove(itemIndex) {
        let vm = this;
        let {$log, $uibModal, OrderListService} = vm.DI();
        //OrderListService.orderList.pop(OrderListService.orderList[id]);
        OrderListService.orderList.forEach(function (item, index, object) {
            if (item.id == itemIndex) {
                object.splice(index, 1)
            }
        })
        // OrderListService.orderList.splice(index,1);
        sessionStorage.orderList = angular.toJson(OrderListService.orderList);
        vm.orderList = OrderListService.orderList;
    }
    save(index, qty) {
        let vm = this;
        let {$log, $uibModal, OrderListService} = vm.DI();
        //OrderListService.orderList.pop(OrderListService.orderList[id]);
        for (var i in OrderListService.orderList) {
            if (OrderListService.orderList[i].id == index) {
                OrderListService.orderList[i].quantity = qty;
            }
        }
        //OrderListService.orderList.splice(index,1);
        sessionStorage.orderList = angular.toJson(OrderListService.orderList);
        vm.orderList = OrderListService.orderList;
    }

    edit(part, qty) {
        let vm = this;
        let {$log, $uibModal, OrderListService} = vm.DI();
    }

   	open() {
        let vm = this, size = "md";
        let {$log, $uibModal} = vm.DI();
        var modalInstance = $uibModal.open({
            templateUrl: 'app/orderList/shareOrderList/shareOrderList.html',
            controller: 'ShareOrderlistController',
            controllerAs: 'shareList',
            // templateUrl: 'app/orderList/ShareError/shareError.html',
            // controller: 'ShareErrorController',
            size: size,
            windowClass: 'my-modal-popup',
            resolve: {
                items: function () {
                    return vm.items;
                }
            }
        });
   	}

    cancel() {
        let vm = this,
            {$uibModalInstance} = vm.DI();
        $uibModalInstance.close();
    }
}
