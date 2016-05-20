export class SearchResultsController {
    constructor($log, $rootScope, $scope, $timeout, $window, $document, dataServices, SearchBarService) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $scope, $timeout, dataServices, SearchBarService });

        $window.scrollTo(0, 0);

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
                    console.log("Bottom Offset :",isHeaderSticky.bottomOffset);
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

        $rootScope.$on('$destroy', function () {
            deregistrationCallback2();
            deregistrationCallback();
        });

        if (SearchBarService.backBottonPressed) {
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

    ymmSearch(year, make, model){
        console.log("ymm");
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        dataServices.ymmSearch(SearchBarService.srchStr, SearchBarService.productLine, SearchBarService.productCategory, year, make, model, 0, 10)
        .then(function(response) {
            vm.filters = response.filter;
            vm.category = response.partCategoryList;
        }, function(error) {

        });
    }

    change(action) {
        let vm = this;
        let {$log} = vm.DI();
        $log.debug("Action", action);
    }

    getParts(from, size, payload) {
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        $scope.$emit("searchbarBlurred");
        vm.searchString = SearchBarService.srchStr;
        vm.productLine = SearchBarService.productLine;
        vm.resultLoading = true;
        console.log(vm.results.totalResults + " " + vm.resultLoading);
        let ymm = null;
        if (SearchBarService.autoSuggestItem && SearchBarService.autoSuggestItem.suggestType === "YMM_SUGGEST") {
            $log.debug("YMM Suggest ..", SearchBarService.autoSuggestItem);
            ymm = SearchBarService.autoSuggestItem.suggestId;
        }

        $scope.$emit("showLoading", true);
        dataServices.catSearch(SearchBarService.srchStr, SearchBarService.productLine, from, size, SearchBarService.productCategory, payload, ymm).then(function (response) {
            // $log.debug("Response in Controller :", response);
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
            vm.sortAttributes = response.filter.slice(0,3);

            vm.results.parts = vm.results.parts.map(function (part) {
                part.displayName = part.partNumber + ' ' + part.partDesc;
                if (part.attrs != null) {
                    part.attrList = Object.keys(part.attrs);
                } else {
                    part.attrList = [];
                }
                return part;
            });
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
        $log.debug("load more clicked." + vm.resultStartIndex + " : " + vm.results.totalResults);
        $log.debug("Truth part 1 :", vm.results.totalResults > vm.resultStartIndex + vm.resultSetLimit);
        $log.debug("Truth part 2 :", vm.results.totalResults > vm.resultSetLimit);
        $log.debug("Truth : ", vm.results.totalResults > vm.resultStartIndex && vm.results.totalResults > vm.resultSetLimit);
        vm.getParts(vm.resultStartIndex, vm.resultSetLimit);
    }
}