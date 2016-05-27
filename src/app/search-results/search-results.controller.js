export class SearchResultsController {
    constructor($log, $rootScope, $scope, $timeout, $window, $document, $stateParams, $interval, dataServices, SearchBarService, appInfoService) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $scope, $timeout, $stateParams, $interval, dataServices, SearchBarService, appInfoService });

        $window.scrollTo(0, 0);

        vm.currentPage = 1;
        vm.searchString = "";
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

        let hierarchySearch = $rootScope.$on("hierarchySearch", (evt) => {
            vm._hierarchyNavigation();
        });

        $scope.$on('$destroy', function () {
            console.log("destroy");
            deregistrationCallback2();
            deregistrationCallback();
            hierarchySearch();
        });

        if ($stateParams.mode && $stateParams.mode === "hierarchy")
            angular.noop();
        else if (SearchBarService.backBottonPressed) {
            vm.getParts(vm.resultStartIndex, vm.resultSetLimit, SearchBarService.selectdeFilters);
        } else if (sessionStorage.refreshClickedSearch) {
            vm.getParts(vm.resultStartIndex, vm.resultSetLimit, SearchBarService.selectdeFilters);
        } else {
            vm.getParts(vm.resultStartIndex, vm.resultSetLimit);
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

    nullSearchCategory(category){
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        SearchBarService.nullSearch = true;
        SearchBarService.productClass = category;
        SearchBarService.productCategory = 0;
        vm.getParts(0, 10, null, null, null, null);
    }

    nullSearchSubCategory(subCategory){
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        SearchBarService.nullSearch = true;
        SearchBarService.productClass = 0;
        SearchBarService.productCategory = subCategory;
        vm.getParts(0, 10, null, null, null, null, null);
    }

    getParts(from, size, payload, year, make, model, ymmObj) {
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        $scope.$emit("searchbarBlurred");
        vm.searchString = SearchBarService.srchStr;
        vm.productLine = SearchBarService.productLine.id;
        vm.resultLoading = true;
        console.log(vm.results.totalResults + " " + vm.resultLoading);
        let ymm = null;
                
        if (ymmObj) {
            ymm = ymmObj.year + ' ' + ymmObj.make + ' ' + ymmObj.model;
            SearchBarService.ymmFilter = ymmObj;
        }
        else if(SearchBarService.productLine.id==2 && SearchBarService.ymmFilter){
            ymm = SearchBarService.ymmFilter.year + ' ' + SearchBarService.ymmFilter.make + ' ' + SearchBarService.ymmFilter.model;
        }
        else{
            ymm = null;
            SearchBarService.ymmFilter = null;
        }
        
        if (SearchBarService.autoSuggestItem && SearchBarService.autoSuggestItem.suggestType === "YMM_SUGGEST") {
            $log.debug("YMM Suggest ..", SearchBarService.autoSuggestItem);
            ymm = SearchBarService.autoSuggestItem.suggestId;
        }

        $log.debug("Srch Str ::", SearchBarService.srchStr);

        $scope.$emit("showLoading", true);



        dataServices.catSearch(SearchBarService.srchStr, SearchBarService.productLine.id, from, size, SearchBarService.productCategory.id, payload, year, make, model, ymm, SearchBarService.productClass ? SearchBarService.productClass.id : null).then(function (response) {
            $log.debug("getParts :", payload, year, make, model);
            vm.resultLoading = false;
            if (vm.resultStartIndex === 0) {
                vm.results.parts = response.parts;
            } else {
                vm.results.parts = vm.results.parts.concat(response.parts);
            }

            vm.results.totalResults = response.totalResults;
            vm.resultSetLimit = response.resultSetLimit;

            vm.filters = response.filter;
            vm.category = response.partCategoryList;
            vm.sortAttributes = response.filter.slice(0, 3);
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
                SearchBarService.productCategory = appInfoService.getCat3($stateParams.cat1,$stateParams.cat2, $stateParams.cat3);
                console.log("prod cat :", SearchBarService.productCategory);
                SearchBarService.productClass = appInfoService.getCat2($stateParams.cat1, $stateParams.cat2);

                vm.getParts(vm.resultStartIndex, vm.resultSetLimit, SearchBarService.selectdeFilters, null, null, null);
            }
        }, 100);
    }
}
