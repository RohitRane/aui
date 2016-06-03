export function PartCardDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/part-card/part-card.html',
        scope: {
            part: '='
        },
        controller: SearchResultDirectiveController,
        controllerAs: 'partCard',
        /* link: function(scope) {
             $timeout(function(){
                 if(angular.isDefined(scope.part) && scope.part.attrs != null){
                     $log.debug("if");
                     scope.part.attrList = Object.keys(scope.part.attrs);
                 }else{ 
                     $log.debug("else");
                     scope.part.attrList =[];
                 }
             }); 
             
          },*/
        bindToController: true
    };
    return directive;
}

class SearchResultDirectiveController {
    constructor($log, $scope, BreadCrumbService, SearchBarService, OrderListService) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $log, $scope, BreadCrumbService, SearchBarService, OrderListService });
          
        /* if(this.part.attrs != null){this.dI.log.debug("if");
             this.part.attrList = Object.keys(this.part.attrs);
         }else{ this.dI.log.debug("else");
             this.part.attrList =[];
         }*/

        this.specLimit = 5;
        this.toggle = false;
        this.specToggleName = "Expand";
        this.shwOrdrTxt = true;
        this.shwQty = false;
        this.shwMsg = false;
    }

    change(msg){
      let vm = this;
      let { SearchBarService, OrderListService } = vm.DI();
      if(msg == "shwQty"){
        this.shwOrdrTxt = false;
        this.shwQty = true;
      }else if(msg == "shwMsg"){
        this.shwQty = false;
        this.shwMsg = true;
        Object.assign(vm.part, {id:OrderListService.orderList.length, qty: vm.qty, addToCart: true, LOB:SearchBarService.productLine.name });
        OrderListService.orderList.push(vm.part);
        sessionStorage.orderList = angular.toJson(OrderListService.orderList);
      }else{
       
      }
    }

    toggleSpecs() {

        if (this.toggle) {
            this.specToggleName = "Expand";
            this.specLimit = 5;
        }
        else {
            this.specToggleName = "Collapse";
            this.specLimit = this.part.attrList.length;
        }
        this.toggle = !this.toggle;
    }

    getImageUrl(part) {
        let retUrl = "http://placehold.it/160x160/dbdbdb/0099CC/?text=NO+IMAGE";
        //url ?  retUrl = url : retUrl = "http://placehold.it/160x160/dbdbdb/0099CC/?text=NO+IMAGE";
        switch (part.categories[2].name) {
            case 'Flanges':  retUrl = "/assets/images/flange.png"; break;
            case 'Universal Joints':  retUrl = "/assets/images/u-joint.jpg"; break;
            case 'Flange Yoke':  retUrl = "/assets/images/flange_yoke.jpg"; break;
            case 'Flange Yokes':  retUrl = "/assets/images/flange_yoke.jpg"; break;
            case 'Ring and Pinions': retUrl = "/assets/images/rangeNpinion.jpg"; break;
            default: angular.noop();
        };
        return retUrl;
    }

    showBack() {
        this.BreadCrumbService.searchToResults = true;
    }
}


