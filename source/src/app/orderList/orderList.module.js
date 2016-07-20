/*Author : Shaifali Jaiswal*/


import { routeConfig } from './orderList.route';
import { OrderListController } from './orderList.controller';
import { OrderListService } from './orderList.service';
import { ShareOrderlistController } from './shareOrderList/shareOrderList.controller';
import { SharedOrderListController } from './sharedOrderList/sharedOrderList.controller';
import { CopyOrderListURLController } from './ShareGetUrl/shareCopyUrl.controller';
import { ShareUrlController } from './ShareCopyUrl/shareCopyUrl.controller';
import { ShareConfirmationController } from './ShareConfirmation/shareConfirmation.controller';
import { OrderlistModalFactory } from './orderList.factory';
import { nospecialcharDirective } from './orderList.noSpecialChar.directive';
import { nonegativeDirective } from './negativeNumber.valid.directive';
import { validtelephoneDirective } from './telephone.valid.directive';
import { adisabledDirective } from './anchorDisabled.directive';




angular.module('aftermarket.orderList',[])
    .controller('OrderListController',OrderListController)
    .controller('ShareOrderlistController',ShareOrderlistController)
    .controller('SharedOrderListController',SharedOrderListController)
    .controller('CopyOrderListURLController',CopyOrderListURLController)
    .controller('ShareUrlController',ShareUrlController)
    .controller('ShareConfirmationController',ShareConfirmationController)
    .service('OrderListService', OrderListService)
    .directive('nospecialcharDirective', nospecialcharDirective)
    .directive('nonegativeDirective', nonegativeDirective)
    .directive('validtelephoneDirective', validtelephoneDirective)
    .directive('adisabledDirective', adisabledDirective)

.service('OrderlistModalFactory', OrderlistModalFactory)
 .filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
})
    .config(routeConfig);
   