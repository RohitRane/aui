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
        vm.sortAttributes = [
            {
                Name: "Relevance",
                Type: "Relevance",
                displayName: "Relevance"
            },
            {
                Name: "partNumber",
                Type: "ASC",
                displayName: "Part Number:Asc"
            },
            {
                Name: "partNumber",
                Type: "DESC",
                displayName: "Part Number:Desc"
            }
        ];

        /*if(sessionStorage.refreshClickedSearch){
            SearchBarService.productLine = $stateParams.cat1? sessionStorage.productLine: 0; 
            SearchBarService.productClass = $stateParams.cat2? sessionStorage.productClass: 0; 
            SearchBarService.productCategory = $stateParams.cat3? sessionStorage.productCategory: 0; 
        }*/

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

        let deregistrationCallback2 = $rootScope.$on('searchLaunched', function (event, payload) {
            $log.debug("$on", payload);
            vm.resultStartIndex = 0;
            vm.getParts(0, 10, payload);
        });

        vm.stickyAd = false;
        let deregistrationCallback = $rootScope.$on("isHeaderSticky", (evt, isHeaderSticky) => {
            $log.debug("isHeaderSticky", isHeaderSticky);
            //isHeaderSticky.state ? vm.stickyAd = true : vm.stickyAd = false;
            let adSec = $document[0].getElementById("ad-section");
            if (isHeaderSticky.state) {
                vm.stickyAd = true;
                if (angular.isDefined(isHeaderSticky.bottomOffset)) {
                    console.log("bottomOffset is defined.");
                    //vm.stickyAd = false;
                    console.log("Bottom Offset :", isHeaderSticky.bottomOffset);
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
            console.log("destroy");
            deregistrationCallback2();
            deregistrationCallback();
            //hierarchySearch();
        });
        //debugger;
        //console.log("abhi in results ", angular.fromJson($stateParams.filterObject));
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
    }



    ymmSearch(year, make, model) {
        console.log("ymm");
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
        $log.debug("Action", action);
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
        console.log(vm.results.totalResults + " " + vm.resultLoading);
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
            $log.debug("YMM Suggest ..", SearchBarService.autoSuggestItem);
            ymm = SearchBarService.autoSuggestItem.suggestId;
        }

        $log.debug("Srch Str ::", SearchBarService.srchStr);

        $scope.$emit("showLoading", true);

        console.log("fffff in catSearch", vm.currentPage1);

        //dataServices.catSearch(SearchBarService.srchStr, SearchBarService.productLine.id, from, size, SearchBarService.productCategory ? SearchBarService.productCategory.id : null, payload, year, make, model, ymm, SearchBarService.productClass ? SearchBarService.productClass.id : null, SearchBarService.sort).then(function (response) {
        dataServices.catSearch($stateParams.str, $stateParams.cat1 ? $stateParams.cat1 : null, $stateParams.from ? $stateParams.from : 0, $stateParams.size ? $stateParams.size : 10, $stateParams.cat3 ? $stateParams.cat3 : null, angular.fromJson($stateParams.filterObject), year, make, model, ymm, $stateParams.cat2 ? $stateParams.cat2 : null, SearchBarService.sort).then(function (response) {
            $log.debug("getParts :", payload, year, make, model);
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
            vm.category = response.partCategoryList;

            vm.currentPage1 = $stateParams.from ? $stateParams.from / 10 : 0;
            vm.currentPage1++;

            if (vm.results.parts) {
                vm.results.parts = vm.results.parts.map(function (part) {
                    part.displayName = part.partNumber + ' ' + part.partDesc;
                    if (part.attrs != null) {
                        part.attrList = Object.keys(part.attrs);
                    } else {
                        part.attrList = [];
                    }
                    return part;
                });

                let intvl = $interval(() => {
                    if (appInfoService.appInfo) {
                        $interval.cancel(intvl);
                        let ymmCatId = appInfoService.getYMMCatId();
                        if (ymmCatId == $stateParams.cat1) {
                            $rootScope.$emit("launchYMMList");
                        }
                    }
                    //vm._intializeCats();
                }, 100);


            }

            $scope.$emit("showLoading", false);
        }, function (error) {
            vm.resultLoading = false;
            $scope.$emit("showLoading", false);
        });
    }

    loadMore() {
        let vm = this;
        let { $log } = vm.DI();
        vm.resultStartIndex = vm.resultStartIndex + vm.resultSetLimit;
        $log.debug("load more clicked." + vm.resultStartIndex + " : " + vm.currentPage);
        vm.getParts(vm.resultStartIndex, vm.resultSetLimit);
    }

    pageChanged() {
        let vm = this;
        let { $log, $stateParams, $state } = vm.DI();
        let paramObj = { "from": (vm.currentPage1 - 1) * 10, "size": 10 };
        $state.go("searchResults", paramObj);
    }

    disableRightClick(evt){
        evt.preventDefault();
	}

    _showYMM() {
        let vm = this;
        let {appInfoService, $stateParams, $interval} = vm.DI();
        let intvl = $interval(() => {
            if (appInfoService.appInfo) {
                $interval.cancel(intvl);
                if ($stateParams.cat1 == appInfoService.getYMMCatId()) {
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
            console.log("Hierarchy nav", appInfoService.appInfo);
            if (angular.isDefined(appInfoService.appInfo) && angular.isDefined(appInfoService.appInfo.cats)) {
                $interval.cancel(intObj);
                SearchBarService.srchStr = "";
                console.log("CAT 1 :", $stateParams.cat1);
                SearchBarService.productLine = appInfoService.getCat1($stateParams.cat1);

                console.log("prod line :", SearchBarService.productLine);
                SearchBarService.productCategory = appInfoService.getCat3($stateParams.cat1, $stateParams.cat2, $stateParams.cat3);
                console.log("prod cat :", SearchBarService.productCategory);
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
