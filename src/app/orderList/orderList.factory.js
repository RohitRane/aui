
export class OrderlistModalFactory {

  /*@ngInject*/
    constructor($uibModal,$timeout) {
        //this.$timeout = $timeout;
         return {
      open: function(size, templateParam, controllerParam, controlleras, params) {
        return $uibModal.open({
          animation: true,
         /* templateUrl: 'app/orderList/ShareGetUrl/getUrl.html',
          controller: 'CopyOrderListURLController',
          controllerAs: 'copyUrl',*/
           templateUrl: templateParam,
          controller: controllerParam,
          controllerAs: controlleras,
          size: size/*,
          resolve: {
            params: function() {
              return params;
            }
          }*/
        });
      }
    };
    }
}









