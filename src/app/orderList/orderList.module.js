/*Author : Shaifali Jaiswal*/


import { routeConfig } from './orderList.route';
import { OrderListController } from './orderList.controller';
import { OrderListService } from './orderList.service';
import { ShareOrderlistController } from './shareOrderList/shareOrderList.controller';

angular.module('aftermarket.orderList',[])
    .controller('OrderListController',OrderListController)
    .controller('ShareOrderlistController',ShareOrderlistController)
    .service('OrderListService', OrderListService)
    .config(routeConfig);
   