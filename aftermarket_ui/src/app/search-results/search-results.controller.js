export class SearchResultsController {
    constructor($log, $location, $rootScope, $state, $scope, $timeout, $window, $document, $stateParams, $interval, dataServices, SearchBarService, appInfoService, BreadCrumbService, AftermarketConstants) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $location, $state, $scope, $timeout, $rootScope, $stateParams, $interval, dataServices, SearchBarService, appInfoService, BreadCrumbService });

        $window.scrollTo(0, 0);

        var qs = $location.search();

        vm.showYMMFlag = false;
        vm._showYMM();

        vm.automotive_id = AftermarketConstants.skin.automotive_id;
        vm.searchString = "";
        // vm.sortAttributes = ["Relevance", "Part Number: ASC", "Part Number: DESC"];
        vm.sortAttributes = SearchBarService.sortAttr;

        vm.appliedFilters = angular.fromJson($stateParams.filterObject);

        vm.results = {
            parts: [],
            totalResults: 0
        };
        vm.resultSetLimit = 10;
        vm.resultStartIndex = 0;
        $timeout(function () {
            $scope.$emit("searchbarBlurred");
        });

        if ($stateParams.mode && $stateParams.mode === "hierarchy") {
            vm._hierarchyNavigation();
        }

        if ($stateParams.mode && $stateParams.mode === "bcNavigation") {
            vm._breadCrumbNavigation();
        }

        vm.resultLoading = false;

        let clearedFilterEvt = $rootScope.$on("clearedFilter", () => {
            $timeout(() => {
                $state.go("searchResults", vm.srchParamObj, { reload: true });
            });
        });

        let deregistrationCallback2 = $rootScope.$on('searchLaunched', function (event, payload) {
            vm.resultStartIndex = 0;
            vm.getParts(0, 10, payload);
        });

        vm.stickyAd = false;
        let deregistrationCallback = $rootScope.$on("isHeaderSticky", (evt, isHeaderSticky) => {
            //isHeaderSticky.state ? vm.stickyAd = true : vm.stickyAd = false;
            let adSec = $document[0].getElementById("ad-section");
            if (isHeaderSticky.state) {
                vm.stickyAd = true;
                if (angular.isDefined(isHeaderSticky.bottomOffset)) {
                    /*angular.element(adSec).css("position", "fixed");
                    angular.element(adSec).css("top", 70+"px");
                    angular.element(adSec).css("bottom", 100+"px");
                    angular.element(adSec).css("right", "0px");*/
                }
            } else {
                vm.stickyAd = false;
                //angular.element(adSec).css("position", 'static');
                angular.element(adSec).css("bottom", 'auto');
                //angular.element(adSec).css("right", 'auto');
            }
        });

        /*let hierarchySearch = $rootScope.$on("hierarchySearch", (evt) => {
            vm._hierarchyNavigation();
        });
*/
        /*let bcSearch = $rootScope.$on("bcSearch", (evt) => {
            vm._breadCrumbNavigation();
        });*/

        $scope.$on('$destroy', function () {
            deregistrationCallback2();
            deregistrationCallback();
            clearedFilterEvt();
            //hierarchySearch();
        });
        //debugger;
        //console.log("abhi in results ", angular.fromJson($stateParams.filterObject));

        $stateParams.cat1==0 ? SearchBarService.productLine = {"id":0} : angular.noop();

        let ymm = {};
        $stateParams.y ? ymm.year = $stateParams.y : angular.noop();
        $stateParams.mk ? ymm.make = $stateParams.mk : angular.noop();
        $stateParams.md ? ymm.model = $stateParams.md : angular.noop();
        let ymmParams = Object.keys(ymm);
        if (!ymmParams.length) {
            ymm = null;
        }

        if ($stateParams.mode && $stateParams.mode === "hierarchy")
            angular.noop();
        else if (SearchBarService.backBottonPressed) {
            vm.getParts(vm.resultStartIndex, vm.resultSetLimit, angular.fromJson($stateParams.filterObject));
        } else if (sessionStorage.refreshClickedSearch) {
            vm.getParts(vm.resultStartIndex, vm.resultSetLimit, angular.fromJson($stateParams.filterObject), null, null, null, ymm);
        } else {
            vm.getParts(vm.resultStartIndex, vm.resultSetLimit, angular.fromJson($stateParams.filterObject), null, null, null, ymm);
        }

        this.sortType = [
            "Relevance",
            "Featured",
            "New Launch",
            "Part Number",
            "Brand Name"
        ];

        if (angular.fromJson($stateParams.ics)) {
            vm.isICSRes = true;
        } else {
            vm.isICSRes = false;
        }
        vm.partNumber = $stateParams.str;
    }



    ymmSearch(year, make, model) {
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        dataServices.ymmSearch(SearchBarService.srchStr, SearchBarService.productLine, SearchBarService.productCategory, year, make, model, 0, 10)
            .then(function (response) {
                vm.filters = response.filter;
                vm.category = response.partCategoryList;
            }, function (error) {

            });
    }

    change(action) {
        let vm = this;
        let {$log} = vm.DI();
    }

    nullSearchCategory(category) {
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        $scope.$emit("nullSearchCategory", category);
    }

    nullSearchSubCategory(category, subCategory) {
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        $scope.$emit("nullSearchSubCategory", category, subCategory);
    }

    getParts(from, size, payload, year, make, model, ymmObj) {
        let vm = this;
        let {$log, $interval, dataServices, $stateParams, SearchBarService, $scope, $rootScope, appInfoService} = vm.DI();
        $scope.$emit("searchbarBlurred");
        vm.searchString = SearchBarService.srchStr;
        vm.productLine = SearchBarService.productLine ? SearchBarService.productLine.id : null;
        vm.pLine = SearchBarService.productLine;
        vm.cat1 = SearchBarService.productLine;
        vm.resultLoading = true;
        let ymm = null;
        if (ymmObj) {
            //ymm = ymmObj.year + ' ' + ymmObj.make + ' ' + ymmObj.model;
            year = ymmObj.year; make = ymmObj.make; model = ymmObj.model;
            SearchBarService.ymmFilter = ymmObj;
        }
        else if (SearchBarService.productLine && SearchBarService.productLine.id == 2 && SearchBarService.ymmFilter) {
            ymm = SearchBarService.ymmFilter.year + ' ' + SearchBarService.ymmFilter.make + ' ' + SearchBarService.ymmFilter.model;
        }
        else {
            ymm = null;
            SearchBarService.ymmFilter = null;
        }

        if (SearchBarService.autoSuggestItem && SearchBarService.autoSuggestItem.suggestType === "YMM_SUGGEST") {
            ymm = SearchBarService.autoSuggestItem.suggestId;
        }


        $scope.$emit("showLoading", true);

        let sortObj = null;
        if ($stateParams.sort) {
            let sObj = SearchBarService.getParticularSAttr($stateParams.sort);
            sortObj = {
                "sortAttribute": sObj.Name,
                "sortType": sObj.Type
            }
        }

        //dataServices.catSearch(SearchBarService.srchStr, SearchBarService.productLine.id, from, size, SearchBarService.productCategory ? SearchBarService.productCategory.id : null, payload, year, make, model, ymm, SearchBarService.productClass ? SearchBarService.productClass.id : null, SearchBarService.sort).then(function (response) {
        let icsFlag  = $stateParams.ics == "true" ? true : false;
        dataServices.catSearch($stateParams.str, $stateParams.cat1 ? $stateParams.cat1 : null, $stateParams.from ? $stateParams.from : 0, $stateParams.size ? $stateParams.size : 10, $stateParams.cat3 ? $stateParams.cat3 : null, angular.fromJson($stateParams.filterObject), year, make, model, ymm, $stateParams.cat2 ? $stateParams.cat2 : null, sortObj, icsFlag).then(function (response) {
            vm.resultLoading = false;
            /*if (from === 0) {
                vm.results.parts = response.parts;
            } else {
                vm.results.parts = vm.results.parts.concat(response.parts);
            }*/
            vm.results.parts = response.parts;
            vm.results.totalResults = response.totalResults;
            vm.resultSetLimit = response.resultSetLimit;
            vm.filters = response.filter;
            if (vm.filters === null) vm.filters = [];
            vm.category = response.partCategoryList;

            vm.currentPage1 = $stateParams.from ? $stateParams.from / 10 : 0;
            vm.currentPage1++;

            if (vm.results.parts) {
                vm.results.parts = vm.results.parts.map(function (part) {
                    part.displayName = part.partNumber + ' ' + part.partDesc;
                    //part.displayName = part.partNumber + ' ' + part.partDesc? part.partDesc: '';
                    if (part.attrs != null) {
                        part.attrList = Object.keys(part.attrs);
                    } else {
                        part.attrList = [];
                    }
                    return part;
                });
                
                
                /*let intvl = $interval(() => {
                    if (appInfoService.appInfo) {
                        $interval.cancel(intvl);
                        let ymmCatId = appInfoService.getYMMCatId();
                        if (ymmCatId == $stateParams.cat1) {
                            $rootScope.$emit("launchYMMList");
                        }
                    }
                    //vm._intializeCats();
                }, 100);*/
                let ymmCatId = appInfoService.getYMMCatId();
                if (ymmCatId == $stateParams.cat1 && !response.intChgPartSearch && $stateParams.str && response.parts.length !== 0) {
                    $rootScope.$emit("launchYMMList");
                    $scope.$emit("showLoading", true);
                    debugger;
                }
                else {
                    $scope.$emit("showLoading", false);
                }
                
            }
            
        }, function (error) {
            vm.resultLoading = false;
            $scope.$emit("showLoading", false);
        });
    }

    loadMore() {
        let vm = this;
        let { $log } = vm.DI();
        vm.resultStartIndex = vm.resultStartIndex + vm.resultSetLimit;
        vm.getParts(vm.resultStartIndex, vm.resultSetLimit);
    }

    pageChanged() {
        let vm = this;
        let { $log, $stateParams, $state } = vm.DI();
        let paramObj = { "from": (vm.currentPage1 - 1) * 10, "size": 10 };
        $state.go("searchResults", paramObj);
    }

    disableRightClick(evt) {
        evt.preventDefault();
    }

    clearFilter(idx = -1, parntIdx = -1) {
        let vm = this;
        let {$stateParams, $state, $rootScope, $timeout} = vm.DI();
        //vm.appliedFilters = angular.fromJson($stateParams.filterObject); 
        let fltrs = angular.fromJson($stateParams.filters);
        if (idx === -1 && parntIdx === -1) {
            fltrs = null;
            vm.appliedFilters = [];
        } else {
            let pos = fltrs.indexOf(vm.appliedFilters[parntIdx].values[idx]);
            fltrs.splice(pos, 1);
            vm.appliedFilters[parntIdx].values.splice(idx, 1);
            if (!vm.appliedFilters[parntIdx].values.length) {
                vm.appliedFilters.splice(parntIdx, 1);
            }
        }

        $rootScope.$broadcast("clearAttrFilter", vm.appliedFilters);

        let fltrObj = vm.appliedFilters.length ? angular.toJson(vm.appliedFilters) : null;
        fltrs = fltrs ? angular.toJson(fltrs) : fltrs;
        let paramObj = {
            "filters": fltrs,
            "filterObject": fltrObj
        }
        paramObj = angular.merge($stateParams, paramObj);

        vm.srchParamObj = paramObj;
    }

    _showYMM() {
        let vm = this;
        let {appInfoService, $stateParams, $interval} = vm.DI();
        let intvl = $interval(() => {
            if (appInfoService.appInfo) {
                $interval.cancel(intvl);
                if (!$stateParams.ics && $stateParams.cat1 == appInfoService.getYMMCatId()) {
                    vm.showYMMFlag = true;
                }
                else
                    vm.showYMMFlag = false;
            }
        }, 100);
    }

    _hierarchyNavigation() {
        let vm = this, {SearchBarService, $stateParams, $timeout, $interval, appInfoService} = vm.DI();
        let intObj = $interval(() => {
            if (angular.isDefined(appInfoService.appInfo) && angular.isDefined(appInfoService.appInfo.cats)) {
                $interval.cancel(intObj);
                SearchBarService.srchStr = "";
                SearchBarService.productLine = appInfoService.getCat1($stateParams.cat1);
                SearchBarService.productCategory = appInfoService.getCat3($stateParams.cat1, $stateParams.cat2, $stateParams.cat3);
                SearchBarService.productClass = appInfoService.getCat2($stateParams.cat1, $stateParams.cat2);

                vm.getParts(vm.resultStartIndex, vm.resultSetLimit, null, null, null, null);
            }
        }, 100);
    }

    _breadCrumbNavigation() {
        let vm = this, {SearchBarService, $stateParams, $timeout, $interval, appInfoService} = vm.DI();
        vm.getParts(vm.resultStartIndex, vm.resultSetLimit, SearchBarService.selectdeFilters, null, null, null);
    }




}
