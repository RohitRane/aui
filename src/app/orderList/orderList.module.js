/*Author : Shaifali Jaiswal*/


import { routeConfig } from './orderList.route';
import { OrderListController } from './orderList.controller';
import { OrderListService } from './orderList.service';
import { ShareOrderlistController } from './shareOrderList/shareOrderList.controller';
import { SharedOrderListController } from './sharedOrderList/sharedOrderList.controller';

angular.module('aftermarket.orderList',[])
    .controller('OrderListController',OrderListController)
    .controller('ShareOrderlistController',ShareOrderlistController)
    .controller('SharedOrderListController',SharedOrderListController)
    .service('OrderListService', OrderListService)
    .config(routeConfig);
   