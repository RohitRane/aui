export function orderMenuDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/menus/order/order.html',
        /*scope: {
            //creationDate: '='
        },*/
        controller: OrderMenuController,
        controllerAs: 'orders',
        bindToController: true,
        replace:true
    };

    return directive;
}

class OrderMenuController{
  constructor(){
    
  }
}