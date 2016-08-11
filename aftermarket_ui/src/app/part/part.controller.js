/*Author:Rohit Rane*/
export class PartController {

    constructor($log, $document, $translate, $stateParams, $location, $scope, $window, $timeout, $uibModal, $interval, SearchBarService, OrderListService, dataServices, SmoothScrollService) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({
            $log, $document, $scope, $stateParams, $location, $window, $timeout, $uibModal, $interval, SearchBarService, OrderListService, dataServices, SmoothScrollService
        });

        $window.scrollTo(0, 0);

        vm.getPart();
        $timeout(function () {
            $scope.$emit("searchbarBlurred");
        });

        let actvPic = $document[0].getElementById("active-pic");

        vm.containerDimensions = {
            height: actvPic.offsetHeight,
            width: actvPic.offsetWidth
        }


        vm.lensDimensions = {
            height: 80,
            width: 80
        };

        //orderlist code 

        vm.shwOrdrTxt = true;
        vm.shwQty = false;
        vm.shwMsg = false;
        vm.qty = "";

        vm.hideForNow = true;

        angular.element($window).bind('resize', () => {
            vm._resizeImage();
        });

        vm.thumbs = [
            /*
                        "/assets/images/u-joint.jpg",
                        "/assets/images/rangeNpinion.jpg",            
                        "/assets/images/flange_yoke.jpg",
                        "/assets/images/flange.png",
                        "/assets/images/machine_pair2.jpg"*/
        ];

        vm.comptblFilter = {
            'year': $stateParams.y,
            'make': $stateParams.mk,
            'model': $stateParams.md
        };


        vm.isCp = Number($stateParams.cp) ? true : false;
        angular.noop();
    }

    isThumbNailActive(thumb, section = 0) {
        let vm = this,
            status = false;
        switch (section) {
        case 0:
            if (vm.activeThumb.url == thumb.fileName) {
                status = true;
            }
        case 1:
            if (vm.activeModal.url == thumb.fileName) {
                status = true;
            }
        case 2:
            if (vm.activeBom.url == thumb.fileName) {
                status = true;
            }

        }

        return status;
    }


    in_array(array, id) {
        for (var i in array) {
            if (array[i].partNumber == id) {
                return {
                    'quantity': array[i].quantity,
                    'id': array[i].id
                }
            }
        }
        return false;
    }


    change(msg) {
        let vm = this;
        let {
            SearchBarService, OrderListService
        } = vm.DI();
        if (msg == "shwQty") {
            this.shwOrdrTxt = false;
            this.shwQty = true;
        } else if (msg == "shwMsg") {
            this.shwQty = false;
            this.shwMsg = true;
            let currData = vm.partData;



            let oldItem = false;
            OrderListService.orderList.map(function (item) {
                if (item.partNumber == currData.partNumber) {
                    item.quantity = Number(item.quantity) + Number(vm.qty);
                    oldItem = true;
                }
            })

            let imgUrl = "";

            if (vm.thumbs[0] && vm.thumbs[0].fileName) {
                imgUrl = vm.thumbs[0].fileName;
            }

            if (oldItem == false) {
                let temp = {
                    id: OrderListService.orderList ? OrderListService.orderList.length : 0,
                    quantity: vm.qty,
                    addToCart: true,
                    partCategory: currData.categories[0].name,
                    partDesc: currData.partDesc,
                    partNumber: currData.partNumber,
                    partName: currData.partNumber + " " + currData.partDesc,
                    partImageUrl: imgUrl
                };
                // Object.assign(vm.part, {id:OrderListService.orderList? OrderListService.orderList.length:0, qty: vm.qty, addToCart: true, LOB:SearchBarService.productLine.name });
                OrderListService.orderList.push(temp);
            }
            sessionStorage.orderList = angular.toJson(OrderListService.orderList);
        } else {

        }
    }

    getPart() {
        let vm = this;
        let {
            $log, $stateParams, $scope, $document, $timeout, $interval, SearchBarService, dataServices
        } = vm.DI();
        vm.productLine = SearchBarService.productLine;
        $scope.$emit("showLoading", true);
        if ($stateParams.type === "partnum") {
            dataServices.partByPartNum($stateParams.val).then(function (response) {
                vm.partData = response;
                setImages();
                vm._createCompatibilityTab();
                //vm._createInterchangesTab();
                $scope.$emit("showLoading", false);
            }, function (error) {
                $scope.$emit("showLoading", false);
            });
        } else {
            dataServices.part($stateParams.id, $stateParams.ic ? $stateParams.ic : null).then(function (response) {
                vm.partData = response;
                setImages();

                vm._createCompatibilityTab();
                //vm._createInterchangesTab();
                $scope.$emit("showLoading", false);
            }, function (error) {
                $scope.$emit("showLoading", false);
            });
        }

        function setImages() {
            let retUrl = "http://placehold.it/1000x1000/dbdbdb/0099CC/?text=NO+IMAGE";
            /*switch (vm.partData.categories[2].name) {
                case 'Flanges': console.log("It's a flanges"); vm.partData.imageUrl = "/assets/images/flange.png"; break;
                case 'Universal Joints': console.log("It's a Universal Jt"); vm.partData.imageUrl = "/assets/images/u-joint.jpg"; vm.partData.modelDiagram = "assets/images/model_diagram.gif"; break;
                case 'Flange Yoke': console.log("It's a Universal Jt"); vm.partData.imageUrl = "/assets/images/flange_yoke.jpg"; break;
                case 'Ring and Pinions': console.log("It's a Universal Jt"); vm.partData.imageUrl = "/assets/images/rangeNpinion.jpg"; break;
                default: vm.partData.imageUrl = retUrl;
            };*/

            vm.modalImage = [];
            vm.bomImage = [];

            angular.forEach(vm.partData.assets, (thumb) => {
                if (thumb.fileName)
                    thumb.show = true;
                if (thumb.assetType === "primary" || thumb.assetType === "outofpackage") {
                    vm.thumbs.push(thumb);
                } else if (thumb.assetType === "modal") {
                    vm.modalImage.push(thumb);
                } else if (thumb.assetType === "bom") {
                    vm.bomImage.push(thumb);
                }

                vm.activeModal = {};
                vm.activeBom = {};
                vm.activeModal.url = vm.modalImage.length ? vm.modalImage[0].fileName : "";
                vm.activeBom.url = vm.bomImage.length ? vm.bomImage[0].fileName : "";
                angular.noop();

            });

            //vm.partData.assets.map();
            //vm.activeThumb.url = vm.partData.imageUrl;
            vm.activeThumb = {
                url: "placehold.it/300x300/dbdbdb/0099CC/?text=NO+IMAGE",
                zoom: false
            };
            angular.forEach(vm.thumbs, (thumb, index) => {
                if (thumb.defaultAssetType) {
                    vm.activeThumb.url = thumb.fileName;
                    vm.activeThumb.zoom = true;
                    delete vm.thumbs[index];
                    vm.thumbs.unshift(thumb);
                }
            });
            let intvl_thumb = $interval(() => {
                let thumbDivs = $document[0].getElementsByClassName("custom-thumbnail");
                angular.forEach(thumbDivs, (thumbDiv) => {
                    var imgs = angular.element(thumbDiv).children();
                    if (imgs.length > 0) {
                        $interval.cancel(intvl_thumb);
                        imgs[0].onerror = function () {
                            angular.element(thumbDiv).css("display", "none");
                            let x = angular.element(this).attr("data-thumb");
                            x = angular.fromJson(x);
                            angular.forEach(vm.thumbs, (thumb) => {
                                if (thumb.fileName === x.fileName) {
                                    thumb.show = false;
                                }
                            });
                        }
                    }

                });

                angular.noop();
            }, 50);
            let intvl = $interval(() => {
                let modal = $document[0].getElementById("modal-image");
                if (modal) {
                    $interval.cancel(intvl);
                    /*angular.element(modal).bind("error", () => {
                        angular.element(modal).css("display", "none");
                    });*/
                    modal.onerror = () => angular.element(modal).css("display", "none");

                }
            }, 50);

            let intvl2 = $interval(() => {
                let bom = $document[0].getElementById("bom-image");
                if (bom) {
                    $interval.cancel(intvl2);
                    /*angular.element(bom).bind("error", () => {
                        angular.element(bom).css("display", "none");
                    });*/
                    bom.onerror = function () {
                        angular.element(bom).css("display", "none");
                    }
                }
            }, 50);

        }
    }

    showThumbNailsSection() {
        let vm = this,
            resp = false;
        angular.forEach(vm.thumbs, (thumb) => {
            resp = resp || thumb.show;
        });
        return resp;
    }

    changeActiveImage(thumb, section = 0) {
        let vm = this;
        let {
            $timeout
        } = vm.DI();
        switch (section) {
        case 0:
            vm.activeThumb.url = thumb;
            break;
        case 1:
            vm.activeModal.url = thumb;
            break;
        case 2:
            vm.activeBom.url = thumb;
            break;
        }

        i
    }

    hasSpecification(attrs) {
        if (attrs) {
            let attrsArr = Object.keys(attrs);
            if (attrsArr.length === 0) {
                return false;
            } else return true
        } else return false;
    }

    hasCompatibility(apps) {
        if (apps) {
            //let attrsArr = Object.keys(apps);
            if (apps.length === 0) {
                return false;
            } else return true
        } else return false;
    }

    hasInterchanges(interchanges) {
        if (interchanges) {
            //let attrsArr = Object.keys(apps);
            if (interchanges.length === 0) {
                return false;
            } else return true
        } else return false;
    }

    goToSection(name) {
        let vm = this,
            {
                SmoothScrollService, $document
            } = vm.DI();
        SmoothScrollService.scrollTo(name);
    }


    _createCompatibilityTab() {
        let vm = this;
        vm.ymmCompatibilityIndex = 0;
        vm.ymmCompatibilityTab = [], vm.ymmCompatibilityTab1 = [], vm.ymmCompatibilityTab2 = [];


        angular.forEach(vm.partData.apps, (ymm, index, compArr) => {
            //(index < Math.ceil(compArr.length / 2)) ? vm.ymmCompatibilityTab1.push(ymm) : vm.ymmCompatibilityTab2.push(ymm);
            vm.ymmFilterYear = (vm.comptblFilter.year === "") ? ymm.year : vm.comptblFilter.year;
            vm.ymmFilterMake = (vm.comptblFilter.make === "") ? ymm.make : vm.comptblFilter.make;
            vm.ymmFilterModel = (vm.comptblFilter.model === "") ? ymm.model : vm.comptblFilter.model;
            if ((ymm.year.match(new RegExp(vm.ymmFilterYear, 'g'))) && (ymm.make.match(new RegExp(vm.ymmFilterMake, 'i'))) && (ymm.model.match(new RegExp(vm.ymmFilterModel,'i')))) {
                vm.ymmCompatibilityTab.push(ymm);
                (vm.ymmCompatibilityIndex % 10 <= 4) ? vm.ymmCompatibilityTab1.push(ymm): vm.ymmCompatibilityTab2.push(ymm);
                vm.ymmCompatibilityIndex++;
            }

        });
        vm.partData.apps.currentPage = 1;
        vm.partData.apps.maxSize = 10;
        vm.partData.apps.pageLength = 6;
        vm.partData.apps.colLength = 5;
        vm.partData.apps.totalPages = vm.ymmCompatibilityTab.length;
        vm.partData.apps.showPagination = vm.partData.apps.totalPages > (vm.partData.apps.pageLength - 1) * 2 ? true : false;
    }

    _createInterchangesTab() {
        let vm = this;

        vm.ymmInterTab1 = [], vm.ymmInterTab2 = [];

        angular.forEach(vm.partData.interchanges, (ymm, index, compArr) => {
            (index < Math.ceil(compArr.length / 2)) ? vm.ymmInterTab1.push(ymm): vm.ymmInterTab2.push(ymm);
        });
        vm.partData.interchanges.currentPage = 1;
        vm.partData.interchanges.maxSize = 10;
        vm.partData.interchanges.pageLength = 6;
        vm.partData.interchanges.totalPages = vm.partData.interchanges.length;

        vm.partData.interchanges.showPagination = vm.partData.interchanges.totalPages > (vm.partData.interchanges.pageLength - 1) * 2 ? true : false;

        vm.partData.interchanges.pageChanged = function () {
            //console.log("this is :",this);
        }
    }
    _resizeImage() {
        let vm = this,
            {
                $document
            } = vm.DI();
        let actvPic = $document[0].getElementById("active-pic");

        vm.containerDimensions = {
            height: actvPic.offsetHeight,
            width: actvPic.offsetWidth
        }

    }
    shareViaEmail() {
        let vm = this;
        let {
            $uibModal, $location
        } = vm.DI();
        var modalInstance = $uibModal.open({
            templateUrl: 'app/part/email/email.html',
            controller: 'EmailController',
            controllerAs: 'email',
            size: 'md',
            windowClass: 'my-modal-popup',
            resolve: {
                url: function () {
                    let x = $location.absUrl();
                    return x;
                }
            },
            bindToController: true
        });
    }

    isSuperSede() {
        let vm = this;
        let {
            $interval
        } = vm.DI();
        vm.superSedeBadge = false;

        let intvl = $interval(() => {
            if (vm.partData && vm.partData.interchanges) {
                $interval.cancel(intvl);
                angular.forEach(vm.partData.interchanges, (intrChng) => {
                    if (intrChng.interChgComments === 'Supersession') {
                        vm.superSedeBadge = true;
                    }
                });
            }
        }, 50);
    }

    showInterBadge() {
        let vm = this;
        let hasIc = false;
        if (vm.partData && vm.partData.interchanges) {
            hasIc = vm.hasInterchanges(vm.partData.interchanges);
        }

        return hasIc || vm.isCp;
    }
}