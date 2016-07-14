/*Author:Rohit Rane*/

export class BreadCrumbController {
    constructor($log, $timeout, $rootScope, $state, $scope, $window, $document, $stateParams, $interval, SearchBarService, BreadCrumbService, appInfoService, searchNavigationService, $translate) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $scope, $rootScope, $state, $window, $document, $timeout, $interval, $stateParams, SearchBarService, appInfoService, BreadCrumbService, searchNavigationService });
        vm.cats = [false, false, false];
        vm.showAll = BreadCrumbService.showAll;
        vm.isBomPart = false;

        vm._resizeBreadCrumb();

        angular.element($window).bind('resize', () => {
            vm._resizeBreadCrumb();
        });

        let intvl = $interval(() => {
            if (appInfoService.appInfo) {
                $interval.cancel(intvl);
                vm.cats = [$stateParams.cat1 ? appInfoService.getCat1($stateParams.cat1) : false, $stateParams.cat2 ? appInfoService.getCat2($stateParams.cat1, $stateParams.cat2) : false, $stateParams.cat3 ? appInfoService.getCat3($stateParams.cat1, $stateParams.cat2, $stateParams.cat3) : false];
                if ($stateParams.y && $stateParams.mk && $stateParams.md) {
                    //vm.ymm = $stateParams.y + ' ' + $stateParams.mk + ' ' + $stateParams.md;
                    vm.ymm = {
                        year: $stateParams.y,
                        make: $stateParams.mk,
                        model: $stateParams.md
                    }
                }
            }
            //vm._intializeCats();
        }, 100);
        if ($state.is('searchResults')) {
            //debugger;
            vm.sortItem = SearchBarService.sort ? "Part Number:" + SearchBarService.sort.sortType[0].toUpperCase() + SearchBarService.sort.sortType.slice(1).toLowerCase() : vm.sortAttributes[0].displayName;
            vm.pageState = 'searchResults';
            if ($stateParams.from) {
                vm.pageStart = (Number($stateParams.from) + 1);
                vm.pageEnd = (Number($stateParams.from) + 10);
            }
            else {
                vm.pageStart = "1";
                vm.pageEnd = "10";
            }
            if ($stateParams.mode && $stateParams.mode === "hierarchy") {
                console.log("STATE PARAMS :", $stateParams);
                $timeout(() => {
                    vm._intializeCats();
                }, 100);

                /*vm.cats = [$stateParams.cat1 ? appInfoService.getCat1($stateParams.cat1) : false, $stateParams.cat2 ? appInfoService.getCat2($stateParams.cat1, $stateParams.cat2) : false, $stateParams.cat3 ? appInfoService.getCat3($stateParams.cat1, $stateParams.cat2, $stateParams.cat3) : false];
                console.log("vm.cats", vm.cats);*/
            } else {
                //vm.cats = [false, false, false];

                /*let mainCat = angular.fromJson(vm.selMainCategory);
                if (mainCat.id === 0) {
                    BreadCrumbService.showAll = true;
                    vm.showAll = BreadCrumbService.showAll;
                } else {
                    //vm.cats[0] = angular.fromJson(vm.selMainCategory);
                }*/

                let intvl = $interval(() => {
                    if (appInfoService.appInfo) {
                        $interval.cancel(intvl);
                        vm.cats = [$stateParams.cat1 ? appInfoService.getCat1($stateParams.cat1) : false, $stateParams.cat2 ? appInfoService.getCat2($stateParams.cat1, $stateParams.cat2) : appInfoService.getCat2WithCat3($stateParams.cat1, $stateParams.cat3), $stateParams.cat3 ? appInfoService.getCat3($stateParams.cat1, $stateParams.cat2, $stateParams.cat3) : false];
                        angular.noop();
                    }
                    //vm._intializeCats();
                }, 100);
            }

            //console.log("In search page");
        } else if ($state.is('part')) {
            if ($stateParams.type === "id") {
                vm.pageState = 'part';
                let a = $document[0].referrer;
                vm.searchString = SearchBarService.srchStr;
                //vm._intializeCats();

                vm.cats = BreadCrumbService.cats;
                $log.debug("Retained Cats :", vm.cats);
            } else if($stateParams.type === "partnum"){
                vm.isBomPart = true;
            }
        }



        $log.debug("BreadCrumbService.searchToResults", BreadCrumbService.searchToResults);

        if (BreadCrumbService.searchToResults) {
            vm.showBackButton = true;
            console.log('show bb', vm.showBackButton);
        } else {
            vm.showBackButton = false;
        }
        if (BreadCrumbService.showOnlyTree) {
            vm.showPathCats = true;
            console.log('show only tree', vm.showPathCats);
        } else {
            vm.showPathCats = false;
        }

        console.log("CAts here :", vm.cats);

        let deregistrationCallback = $rootScope.$on("categoryFilterApplied", function (evt, selectedCategory) {
            if ($stateParams.mode !== "hierarchy") {
                vm._intializeCats();
            }
            else {
                vm._intializeCats();
                //vm.cats[2] = selectedCategory.name;
            }
        });

        let deregistrationCallback2 = $rootScope.$on("clearCategories", function () {
            $timeout(() => {
                vm.cats = [false, false, false];
                //vm.cats[0] = vm.selMainCategory;
            }, 100);
        });

        /*let ymmEvent = $rootScope.$on("ymmFiltersApplied", (evt, ymm) => {
            vm.ymm = ymm;
            $log.debug("YMM IS :", vm.ymm);
        });*/

        let showAll = $rootScope.$on("showAll", (evt, status) => {
            BreadCrumbService.showAll = status;
            vm.showAll = status;
        });

        let searchLaunched = $rootScope.$on('searchLaunched', function (event, payload) {
            $timeout(() => {
                vm._intializeCats();
            }, 200);
        });

        $rootScope.$on('$destroy', function () {
            deregistrationCallback();
            deregistrationCallback2();
            ymmEvent();
            showAll();
            searchLaunched();
        });


    }

    showSubsetInfo(totalResults, resultSetLimit) {
        let retValue = false;
        (Number(totalResults) > Number(resultSetLimit)) ? retValue = true : retValue = false;
        return retValue;
    }

    goToSearch() {
        let vm = this;
        let {$state, $window} = vm.DI();
        $window.history.back();
        //$state.go("searchResults");
    }

    _resizeBreadCrumb() {
        let vm = this;
        let {$window, $document} = vm.DI();

        console.log("Resizing the Breadrumb", $window.innerWidth);
        if ($window.innerWidth > 1440) {
            let mgn = -1 * (($window.innerWidth - 1440) / 2);
            let pdng = -1 * mgn;
            let bdcmb = ($document[0].getElementsByClassName('bread-crumb'))[0];
            angular.element(bdcmb).css("margin-left", mgn + "px");
            angular.element(bdcmb).css("margin-right", mgn + "px");
            angular.element(bdcmb).css("padding-left", pdng + "px");
            angular.element(bdcmb).css("padding-right", pdng + "px");
        }
    }

    sortAction(sortObj) {
        let vm = this;
        let {SearchBarService, $scope, $state} = vm.DI();
        if (sortObj.Name == "Relevance") {
            SearchBarService.sort = null;
        } else {
            SearchBarService.sort = {
                sortAttribute: sortObj.Name,
                sortType: sortObj.Type
            };
        }

        console.log("SearchBarService.sort ", SearchBarService.sort);
        let paramObj = { "from": "", "size": "", "sort": SearchBarService.sort ? SearchBarService.sort.sortType == "ASC" ? 1 : 2 : "" };
        $state.go("searchResults", paramObj);
        //$scope.$emit("searchLaunched");
        // vm.sortItemChanged({selectedFilters:SearchBarService.selectdeFilters, sortItem:sortObj});
    }

    showColon(index, cats) {
        let vm = this, resp = true;
        let {appInfoService} = vm.DI();
        //let mnCat = angular.fromJson(vm.selMainCategory);
        if (!(cats[index] && cats[index].id)) {
            resp = false;
        }

        else if (index === cats.length - 1 && vm.searchString === "" && !(vm.ymm && appInfoService.getYMMCatId() == cats[0].id)) {
            resp = false;
        } else if (!(cats[index + 1] && cats[index + 1].id) && !(cats[index + 2] && cats[index + 2].id) && vm.searchString === "" && !(vm.ymm && appInfoService.getYMMCatId() == cats[0].id)) {
            resp = false;
        }
        return resp;
    }

    showYmm() {
        let vm = this, retVal = false;
        let {SearchBarService, appInfoService} = vm.DI();
        /*if (SearchBarService.ymmFilter) {
            vm.ymm = SearchBarService.ymmFilter;
        }*/
        if (vm.ymm && appInfoService.getYMMCatId() == cats[0].id && vm.resultLength) {
            retVal = true;
        }
        return retVal;
    }

    search(level = -1, type = 1) {
        let vm = this, {$scope, $state, $rootScope, $stateParams, appInfoService, SearchBarService, BreadCrumbService, searchNavigationService} = vm.DI();
        console.log("vm.cats ", vm.cats, vm.categories, type, level);
        if (level == -1) {
            if (SearchBarService.productLine && SearchBarService.productLine.id) {
                SearchBarService.productLine = appInfoService.getCat1(0);
                SearchBarService.productClass = null;
                SearchBarService.productCategory = null;
                launch();
            }
        }
        else {
            if (type === 1) {
                switch (level) {
                    case 0: if (vm.cats[level + 1] && vm.cats[level + 1].id) {
                        SearchBarService.productLine = appInfoService.getCat1(vm.cats[level].id);
                        SearchBarService.productClass = null;
                        SearchBarService.productCategory = null;
                        SearchBarService.categoryfilters = [];
                        SearchBarService.filters = [];
                        SearchBarService.selectdeFilters = [];
                        launch();

                    }
                        break;
                    case 1: if (vm.cats[level + 1] && vm.cats[level + 1].id) {
                        SearchBarService.productLine = appInfoService.getCat1(vm.cats[level - 1].id);
                        SearchBarService.productClass = appInfoService.getCat2(vm.cats[level - 1].id, vm.cats[level].id);
                        SearchBarService.productCategory = null;
                        launch();
                        //$scope.$emit("breadCrumSearchCategory", SearchBarService.productClass);
                    }
                        break;
                    case 2: if ($state.is("searchResults")) {
                        angular.noop();
                    } else {
                        SearchBarService.listPreviousFilter = [];
                        SearchBarService.productLine = vm.cats[0];
                        SearchBarService.productClass = vm.cats[1];
                        SearchBarService.productCategory = vm.cats[2];
                        launch();
                    } break;
                    default: angular.noop(); break;
                }
            } else {
                BreadCrumbService.showAll = false;
                SearchBarService.srchStr = null;
                switch (level) {
                    case 0: if (vm.categories[level + 1] && vm.categories[level + 1].id) {
                        SearchBarService.productLine = appInfoService.getCat1(vm.categories[level].id);
                        SearchBarService.productClass = null;
                        SearchBarService.productCategory = null;
                        launch();

                    }
                        break;
                    case 1: if (vm.categories[level + 1] && vm.categories[level + 1].id) {
                        SearchBarService.productLine = appInfoService.getCat1(vm.categories[level - 1].id);
                        SearchBarService.productClass = appInfoService.getCat2(vm.categories[level - 1].id, vm.categories[level].id);
                        SearchBarService.productCategory = null;
                        launch();
                    }
                        break;
                    case 2: if ($state.is("searchResults")) {
                        angular.noop();
                    } else {
                        SearchBarService.productLine = vm.categories[0];
                        SearchBarService.productClass = vm.categories[1];
                        SearchBarService.productCategory = vm.categories[2];
                        launch();
                    } break;
                    default: angular.noop(); break;
                }
            }

        }

        function launch() {
            let sParams = $stateParams;
            searchNavigationService.gotoResultsPage(SearchBarService.productLine, SearchBarService.productClass, SearchBarService.productCategory, null, SearchBarService.srchStr);
            /*if ($state.is("searchResults")) {
                $rootScope.$emit("bcSearch");
                vm._intializeCats();
            } else if ($state.is("part")) {
                let paramObj = { 'mode': "bcNavigation" };
                $state.go("searchResults", paramObj);
            }*/

        }
    }

    _intializeCats() {
        let vm = this;
        let {$interval, $stateParams, SearchBarService, appInfoService, BreadCrumbService} = vm.DI();
        /*if (SearchBarService.productLine && SearchBarService.productLine.id) {*/
        if ($stateParams.cat1) {
            vm.cats[0] = SearchBarService.productLine;
            let intObj = $interval(() => {
                if (appInfoService.appInfo) {
                    vm.cats[1] = SearchBarService.productClass ? SearchBarService.productClass : appInfoService.getCat2WithCat3(SearchBarService.productLine.id, SearchBarService.productCategory ? SearchBarService.productCategory.id : null);
                    $interval.cancel(intObj);
                    initBCService();
                }
            }, 200);
            vm.cats[2] = SearchBarService.productCategory;
            if (vm.cats[2] && vm.cats[1] && vm.cats[2].id === vm.cats[1].id) {
                vm.cats[2] = null;
            } else if (vm.cats[1] && vm.cats[0] && vm.cats[1].id === vm.cats[0].id) {
                vm.cats[1] = null;
            }
        } else {
            vm.cats = [false, false, false];
        }
        initBCService();
        function initBCService() {
            BreadCrumbService.cats = vm.cats;
        }
    }
    isClickable(level = -1, type = 1) {
        let vm = this, {$state, $rootScope, appInfoService, SearchBarService} = vm.DI();
        let retVal = false;
        if (level == -1) {
            if (SearchBarService.productLine && SearchBarService.productLine.id) {
                retVal = true;
            }
        }
        else {
            if (type === 1) {
                switch (level) {
                    case 0: if (vm.cats[level + 1] && vm.cats[level + 1].id) {
                        retVal = true;
                    }
                        break;
                    case 1: if (vm.cats[level + 1] && vm.cats[level + 1].id) {
                        retVal = true;
                    }
                        break;
                    case 2: if ($state.is("searchResults")) {
                        angular.noop();
                    } else {
                        retVal = true;
                    }
                    default: angular.noop(); break;
                }
            } else {
                switch (level) {
                    case 0: if (vm.categories[level + 1] && vm.categories[level + 1].id) {
                        retVal = true;
                    }
                        break;
                    case 1: if (vm.categories[level + 1] && vm.categories[level + 1].id) {
                        retVal = true;
                    }
                        break;
                    case 2: if ($state.is("searchResults")) {
                        angular.noop();
                    } else {
                        retVal = true;
                    }
                    default: angular.noop(); break;
                }

            }

        }
        return retVal;
    }
}
