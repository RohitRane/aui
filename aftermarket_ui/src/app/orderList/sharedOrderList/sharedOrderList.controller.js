/*Author : Shaifali Jaiswal*/
export class SharedOrderListController {
    constructor($stateParams, dataServices, SearchBarService, OrderListService) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({$stateParams, dataServices, OrderListService});
        console.log("SHARED ", $stateParams.id);
        vm.getSharedList();
    }

    getSharedList(){
    	let vm = this,
      	{ $stateParams, dataServices, OrderListService } = vm.DI();
    	dataServices.shareOrderList($stateParams.id).then(function (response) {
            vm.sharedList = response.data.APIResponse;
            console.log(" vm.sharedList ",  vm.sharedList);
        }, function (error) {
        });
    }
}
