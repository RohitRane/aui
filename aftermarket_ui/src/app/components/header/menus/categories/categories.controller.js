export class CategoryMenuController {
    constructor($scope, $log, $document, $timeout, $window, $interval, $state, $rootScope, $q, dataServices, appInfoService, BreadCrumbService, SearchBarService, searchNavigationService) {
        'ngInject';

        let vm = this;

        vm.DI = () => ({ $scope, $log, $document, $timeout, $window, $interval, $state, $rootScope, $q, BreadCrumbService, SearchBarService, searchNavigationService });

        angular.element($window).bind('resize', () => {
            vm._sizeMegaMenuPopover();
        });

        let intervalObj = $interval(() => {
            if (angular.isDefined(appInfoService.appInfo) && angular.isDefined(appInfoService.appInfo.cats)) {
                $interval.cancel(intervalObj);
                vm.categories = appInfoService.appInfo.cats;
                angular.forEach(vm.categories, (cat) => {
                    angular.forEach(cat.children, (child, index) => {
                        child.displayChildren = [];
                        child.displayChildren[0] = [];
                        let colCnt = 0;
                        angular.forEach(child.children, (gChild, index) => {
                            child.displayChildren[colCnt].push(gChild);
                            if ((index+1) % 9 === 0 && index+1 / 9 >= 1) {
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

        $rootScope.$on("realignMegaMenu", () => {
            vm.categories[1].open = true;
            $timeout(() => {
                //vm.catHover(vm.categories[0]);
                vm.categories[1].open = false;
            });
        });

    }

    catHover(cat) {
        //debugger;
        let vm = this;
        let { $log, $document, $timeout, $window, $q } = vm.DI();
        $log.debug("Cat hovered.", $window.innerWidth);

        let closeOthers = () => {
            return $q((resolve) => {
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
        }

        /*let closeOthers = () => new Promise((resolve) => {
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
        });*/
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
                    angular.element(col).css("margin-top", hdr.offsetHeight + 5 + "px");
            });
        }
    }

    search(cat1, cat2, cat3) {

        let vm = this, {$scope, $state, $rootScope, BreadCrumbService, SearchBarService, searchNavigationService, $timeout} = vm.DI();

        $scope.$emit("reachedhome");
        console.log("Cat-e-gory", cat1, cat2, cat3);
        SearchBarService.sort = null;
        let paramObj = { 'mode': 'hierarchy', 'str': "", 'cat1': cat1 ? cat1.id : null, 'cat2': cat2 ? cat2.id : null, 'cat3': cat3 ? cat3.id : null, 'filterObject': "" };
        $rootScope.$emit("applyHierarchyScope", cat1);
        BreadCrumbService.showAll = false;
        /*if ($state.is("searchResults")) {
            $rootScope.$emit("hierarchySearch");
        }*/
        SearchBarService.srchStr = "";
        SearchBarService.listPreviousFilter = [];
        SearchBarService.selectdeFilters = [];
        //SearchBarService.selectdeFilters = [];
        $rootScope.$emit("clearCategoryFilter");
        //$state.go("searchResults", paramObj);
         BreadCrumbService.searchToResults = true;
        searchNavigationService.gotoResultsPage(cat1, cat2, cat3);
        $timeout(() => {
            cat1.open = false;
        }, 100);

    }

    linkClicked(evt,cat1, cat2, cat3) {
        //evt.preventDefault();
               
        let vm = this, {$scope, $state, $rootScope, BreadCrumbService, SearchBarService, searchNavigationService, $timeout} = vm.DI();
        SearchBarService.sort = null; 
        $scope.$emit("reachedhome");
        let paramObj = { 'mode': 'hierarchy', 'str': "", 'cat1': cat1 ? cat1.id : null, 'cat2': cat2 ? cat2.id : null, 'cat3': cat3 ? cat3.id : null, 'filterObject': "" };
        $rootScope.$emit("applyHierarchyScope", cat1);
        BreadCrumbService.showAll = false;
        SearchBarService.srchStr = "";
        SearchBarService.listPreviousFilter = [];        
        $rootScope.$emit("clearCategoryFilter");
        BreadCrumbService.searchToResults = true;
        $timeout(() => {
            cat1.open = false;
        }, 100);
    }

    disableRightClick(evt){
        evt.preventDefault();
	}

} 