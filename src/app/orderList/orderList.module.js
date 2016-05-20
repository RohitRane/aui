/*Author : Shaifali Jaiswal*/


import { routeConfig } from './orderList.route';
import { OrderListController } from './orderList.controller';
import { ShareOrderlistController } from './shareOrderList/shareOrderList.controller';

angular.module('aftermarket.orderList',[])
    .controller('OrderListController',OrderListController)
    .controller('ShareOrderlistController',ShareOrderlistController)
    .config(routeConfig);
   