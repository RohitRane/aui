export class CategoryMenuController {
    constructor($scope, $log, $document, $timeout, $window, $interval, $state, $rootScope, dataServices, appInfoService) {
        'ngInject';

        let vm = this;

        vm.DI = () => ({ $scope, $log, $document, $timeout, $window, $interval, $state, $rootScope });

        angular.element($window).bind('resize', () => {
            vm._sizeMegaMenuPopover();
        });

        let intervalObj = $interval(() => {
            if (angular.isDefined(appInfoService.appInfo.cats)) {
                $interval.cancel(intervalObj);
                vm.categories = appInfoService.appInfo.cats;
                angular.forEach(vm.categories, (cat) => {
                    angular.forEach(cat.children, (child, index) => {
                        child.displayChildren = [];
                        child.displayChildren[0] = [];
                        let colCnt = 0;
                        angular.forEach(child.children, (gChild, index) => {
                            child.displayChildren[colCnt].push(gChild);
                            if (index % 10 === 0 && index / 10 >= 1) {
                                //child.gChildCount = 0;
                                colCnt++;
                                child.displayChildren[colCnt] = [];
                            }
                        });
                        $log.debug(child.name, "displayChildren :", child.displayChildren);
                    });

                });
            }
        }, 200);

        $scope.currentIndex = "";
        $scope.setCurrentIndex = function (index) {
            $scope.currentIndex = index;
        }

        $scope.clickHandler = function () {
            //evt.$parent.categoryMenu.data
            //  console.log('emitting the message');
            //$scope.$emit("showSubMenu");
        }

    }

    catHover(cat) {
        let vm = this;
        let { $log, $document, $timeout, $window } = vm.DI();
        $log.debug("Cat hovered.", $window.innerWidth);


        let closeOthers = () => new Promise((resolve) => {
            cat.open = true;
            angular.forEach(vm.categories, function (item, index, arr) {
                if (cat.name !== item.name) {
                    item.open = false;
                }
                if (index === arr.length - 1) {
                    $log.debug(index + ":" + arr.length);
                    resolve();
                }
            });
        });
        vm.hoverTimeout = $timeout(() => {
            closeOthers().then(function () {
                $timeout(() => {
                    vm._sizeMegaMenuPopover();
                }, 150);
            });
        }, 500);


    }

    catLeave(cat) {
        let vm = this;
        let { $timeout} = vm.DI();
        cat.open = false;
        $timeout.cancel(vm.hoverTimeout);

    }

    _sizeMegaMenuPopover() {
        let vm = this;
        let { $document, $window } = vm.DI();
        let subCatList = $document[0].getElementById("subcategories");
        let subCatWidth = $window.innerWidth < 1440 ? $window.innerWidth : 1440;
        angular.element(subCatList).css("width", subCatWidth + "px");
        let subCatMarginLeft = $window.innerWidth < 1440 ? 0 : ($window.innerWidth - 1440) / 2;
        angular.element(subCatList).css("margin-left", subCatMarginLeft + "px");
    }

    setTop(index, parent) {
        let vm = this, { $document, $timeout } = vm.DI();
        console.log("Elem :", index, parent);
        if (index > 0) {
            $timeout(() => {
                let hdrStr = "cat_header_" + parent;
                console.log("Hdr str :", hdrStr);
                let hdr = $document[0].getElementById(hdrStr);
                console.log("ele height :", hdr.offsetHeight);
                let colStr = parent + "_col_" + index;
                let col = $document[0].getElementById(colStr);
                if (parent === "Industrial") {
                    angular.element(col).css("margin-top", hdr.offsetHeight + 3 + "px");
                } else
                    angular.element(col).css("margin-top", hdr.offsetHeight + "px");
            });
        }
    }

    search(cat1, cat2, cat3) {
        let vm = this, {$state, $rootScope} = vm.DI();
        console.log("Cat-e-gory", cat1, cat2, cat3);
        let paramObj = { 'mode': 'hierarchy', 'cat1': cat1, 'cat2': cat2, 'cat3': cat3 };
        $rootScope.$emit("applyHierarchyScope",cat1);
        if ($state.is("searchResults")) {
            $rootScope.$emit("hierarchySearch");
        } 
        $state.go("searchResults", paramObj);
    }

} 