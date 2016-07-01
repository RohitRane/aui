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
        link: function(scope, elem, attrs) {
            /*elem.bind('keypress', (e) => {
                var regex = new RegExp("^[0-9]+$");
                var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (regex.test(str)) {
                    return true;
                }

                e.preventDefault();
                return false;
            });*/
            /*$timeout(function(){
            if(angular.isDefined(scope.part) && scope.part.attrs != null){
            $log.debug("if");
            scope.part.attrList = Object.keys(scope.part.attrs);
            }else{
            $log.debug("else");
            scope.part.attrList =[];
            }
            });*/

        },
        bindToController: true
    };
    return directive;
}

class SearchResultDirectiveController {
    constructor($log, $scope, $stateParams, $state, BreadCrumbService, SearchBarService, OrderListService, $translate) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $log, $scope, $stateParams, $state, BreadCrumbService, SearchBarService, OrderListService });

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
        this.qty = "";
        this.qtyNotAllowed = (this.qty > 0) ? false : true;


    }
    checkOrderlistVal() {
        if (this.qty > 0) {
            this.qtyNotAllowed = false;
        }
    }
    change(msg) {
        let vm = this;
        let { SearchBarService, OrderListService } = vm.DI();
        if (msg == "shwQty") {
            this.shwOrdrTxt = false;
            this.shwQty = true;
            if (this.qty > 0) {
                this.qtyNotAllowed = false;
            } else {
                this.qtyNotAllowed = true;
            }
        } else if (msg == "shwMsg") {
            this.shwQty = false;
            this.shwMsg = true;

            let oldItem = false;
            OrderListService.orderList.map(function(item) {
                if (item.partNumber == vm.part.partNumber) {
                    item.quantity = Number(item.quantity) + Number(vm.qty);
                    oldItem = true;
                }
            })
            if (oldItem == false) {
                let temp = {
                    id: OrderListService.orderList ? OrderListService.orderList.length : 0,
                    partNumber: vm.part.partNumber,
                    quantity: vm.qty,
                    partCategory: vm.part.categories[0].name,
                    partName: vm.part.displayName,
                    partImageUrl: vm.part.imageUrl
                        //
                };
                OrderListService.orderList.push(temp);
            }

            // Object.assign(vm.part, {id:OrderListService.orderList? OrderListService.orderList.length:0, qty: vm.qty, addToCart: true, LOB:SearchBarService.productLine.name });

            sessionStorage.orderList = angular.toJson(OrderListService.orderList);
        } else {

        }
    }

    sort(sortObj) {
        let vm = this;
        let { SearchBarService } = vm.DI();
        if (sortObj = "")
            SearchBarService.sort = {
                sortType: sortObj.Name,
                sortName: sortObj.Type
            }
    }

    toggleSpecs() {

        if (this.toggle) {
            this.specToggleName = "Expand";
            this.specLimit = 5;
        } else {
            this.specToggleName = "Collapse";
            this.specLimit = this.part.attrList.length;
        }
        this.toggle = !this.toggle;
    }

    getImageUrl(part) {
        let retUrl = "http://placehold.it/160x160/dbdbdb/0099CC/?text=NO+IMAGE";
        //url ?  retUrl = url : retUrl = "http://placehold.it/160x160/dbdbdb/0099CC/?text=NO+IMAGE";
        switch (part.categories[2].name) {
            case 'Flanges':
                retUrl = "/assets/images/flange.png";
                break;
            case 'Universal Joints':
                retUrl = "/assets/images/u-joint.jpg";
                break;
            case 'Flange Yoke':
                retUrl = "/assets/images/flange_yoke.jpg";
                break;
            case 'Flange Yokes':
                retUrl = "/assets/images/flange_yoke.jpg";
                break;
            case 'Ring and Pinions':
                retUrl = "/assets/images/rangeNpinion.jpg";
                break;
            default:
                angular.noop();
        };
        return retUrl;
    }

    showBack() {
        this.BreadCrumbService.searchToResults = true;
    }

    gotoPart(id) {
            let vm = this;
            let { $stateParams, $state } = vm.DI();
            let paramObj = { "id": id, "type": "id" };
            angular.extend(paramObj, $stateParams);
            //let paramKeys = Object.keys(paramObj);
            angular.forEach(paramObj, (value, key, obj) => {
                angular.isUndefined(value) ? delete obj[key] : angular.noop();
            });
            //$state.go("part", paramObj);
            return $state.href("part", paramObj);
        }
        /*nospecial() {
            deb
            var regex = new RegExp("^[0-9]+$");
            var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            if (regex.test(str)) {
                return true;
            }

            e.preventDefault();
            return false;
        }*/
}
