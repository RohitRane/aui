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
        link: function (scope, elem, attrs) {
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
            scope.part.attrList = Object.keys(scope.part.attrs);
            }else{
            scope.part.attrList =[];
            }
            });*/

        },
        bindToController: true
    };
    return directive;
}

class SearchResultDirectiveController {
    constructor($log, $timeout, $stateParams, $state, $document, BreadCrumbService, SearchBarService, OrderListService, appInfoService) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $log, $timeout, $stateParams, $state, BreadCrumbService, SearchBarService, OrderListService, appInfoService });
        vm.partImage = appInfoService.appInfo.cdnBaseurl;

        this.specLimit = 5;
        this.toggle = false;
        this.specToggleName = "Expand";
        this.shwOrdrTxt = true;
        this.shwQty = false;
        this.shwMsg = false;
        this.qty = "";
        this.qtyNotAllowed = (this.qty > 0) ? false : true;

        this.assignPartImage();
        $timeout(() => {
            let partPics = $document[0].getElementsByClassName("default-pic");
            angular.forEach(partPics, (partPic) => {
                partPic.onerror = function () {
                    this.src = "http://placehold.it/160x160/dbdbdb/0099CC/?text=NO+IMAGE";
                }
            });
        });        
        
        $timeout(() => {
            let brandLogos = $document[0].getElementsByClassName("brand-logo");
            angular.forEach(brandLogos, (brandLogo) => {
                brandLogo.onerror = function () {
                    angular.element(this).css("display", "none");
                }
            });
        });

    }

    assignPartImage() {
        for (let key of this.part.attrList) {
            if (key == "Brand") {
                this.part.attrs[key] == 'SPL' ? this.partImage += "/logo/logo_Spicer" + ".jpg" : this.partImage += "/logo/logo_" + this.part.attrs[key] + ".jpg";
                return;
            }
        }
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
            OrderListService.orderList.map(function (item) {
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

    gotoPart(part) {
        let vm = this;
        let { $stateParams, $state } = vm.DI();
        let ic = null;
        let cp = 0;
        if(part.interChngPart){
            if(part.interchanges[0].partNumber){
                ic = part.interchanges[0].partNumber;
            }
            else{
                cp = 1;
            }
        }
        let paramObj = { "id": part.id, "type": "id","ic":ic,"cp":cp };
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
