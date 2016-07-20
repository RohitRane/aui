/*Author : Shaifali Jaiswal*/
export function routeConfig($stateProvider){
	'ngInject';
	$stateProvider
		.state('orderList', {
			url: '/orderlist',
			parent: 'aftermarket',
			templateUrl: 'app/orderList/orderList.html',
			controller:'OrderListController',
			controllerAs:'orderlist'
		})
		.state('sharedOrderList', {
			url: '/sharedOrderList/:id',
			parent: 'aftermarket',
			templateUrl: 'app/orderList/sharedOrderList/sharedOrderList.html',
			controller:'SharedOrderListController',
			controllerAs:'sharedOrderlist'
		});
}
