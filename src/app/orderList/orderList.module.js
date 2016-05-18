/*Author : Shaifali Jaiswal*/
import{ OrderListController } from './orderList.controller';
import{ routeConfig } from './orderList.route'

angular.module('aftermarket.orderList', ['aftermarket.core'])
	.config(routeConfig)
	.controller('OrderListController', OrderListController);

	
	