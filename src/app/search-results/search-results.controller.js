export class SearchResultsController {
    constructor($log, $rootScope, $scope, $timeout, $window, dataServices, SearchBarService) {
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

        $rootScope.$on('$destroy', function () {
            deregistrationCallback2();
        });

        if (SearchBarService.backBottonPressed) {
            vm.getParts(vm.resultStartIndex, vm.resultSetLimit, SearchBarService.selectdeFilters);
        } else if (sessionStorage.refreshClickedSearch) {
            vm.getParts(vm.resultStartIndex, vm.resultSetLimit, SearchBarService.selectdeFilters);
        } else {
            vm.getParts(vm.resultStartIndex, vm.resultSetLimit);
        }
        
        /*dataServices.partSearch().then(function (response) {
            $log.debug("Response in Controller :", response);
            vm.results = response;
            vm.results.parts = vm.results.parts.map(function (part) {
                part.displayName = part.sku + ' ' + part.name;
                return part;
            });
            $log.debug("results :", vm.results);
        }, function (error) {
            $log.debug("Error in response :", error);
        });*/

        this.sortType = [
            "Relevance",
            "Featured",
            "New Launch",
            "Part Number",
            "Brand Name"
        ];
        
        /* this.category =[
             "Relevance",
             "Featured",
             "New Launch",
             "Part Number",
             "Brand Name"
         ];
         
         this.filters = [{
             "name": "Greasable",
             "type": "STRING",
             "id": "id1",
             "buckets": [{
                 "key": "Y",
                 "count": 38
             }, {
                     "key": "N",
                     "count": 8
                 }]
         }, {
                 "name": "Type",
                 "type": "STRING",
                 "id": "id2",
                 "buckets": [{
                     "key": "ISR Style",
                     "count": 15
                 }, {
                         "key": "OSR Style",
                         "count": 12
                     }, {
                         "key": "WB Style",
                         "count": 6
                     },{
                         "key": "OSR/ISR Style21",
                         "count": 1
                     },{
                         "key": "WB Style56",
                         "count": 6
                     },{
                         "key": "OSR/ISR Style78",
                         "count": 1
                     }]
             }, {
                 "name": "brand",
                 "type": "STRING",
                 "id": "id3",
                 "buckets": [{
                     "key": "Spicer",
                     "count": 24
                 }, {
                         "key": "SVL By Dana",
                         "count": 22
                     }]
             },
              {
                 "name": "TEST Single",
                 "type": "NUMERIC",
                 "buckets": [{
                     "key": "Spicer",
                     "count": 24
                 }]
             },
             {
                 "name": "AXEL",
                 "type": "NUMERIC",
                 "buckets": [{
                     "key": "n1",
                     "count": 25
                 }, {
                         "key": "n2",
                         "count": 8
                     }, {
                         "key": "n3",
                         "count": 10
                     }, {
                         "key": "n4",
                         "count": 20
                     }]
             }, {
                     "name": "NUMERIC_RANGE",
                     "type": "NUMERIC_RANGE",
                     "buckets": [{
                         "key": "7.547",
                         "start": 1,
                         "end": 10,
                         "count": 2
                     },{
                         "key": "7.547",
                         "start": 11,
                         "end": 20,
                         "count": 2
                     }]
         }];*/
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
        //let typeId = SearchBarService.typeId;
        /*if (typeId === 4) {*/
        //from ? from : from=0;
        //size ? size : size=10;
        vm.resultLoading = true;
        console.log(vm.results.totalResults + " " + vm.resultLoading);
        $log.debug("SearchBarService.productCategory:", SearchBarService.productCategory);
        let ymm = null;
        if (SearchBarService.autoSuggestItem && SearchBarService.autoSuggestItem.suggestType === "YMM_SUGGEST") {
            $log.debug("YMM Suggest ..", SearchBarService.autoSuggestItem);
            ymm = SearchBarService.autoSuggestItem.suggestId;
        }
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
            $log.debug("response.filter:", response.filter);
            $log.debug("response.CategoryList", vm.category);

            vm.results.parts = vm.results.parts.map(function (part) {
                part.displayName = part.partNumber + ' ' + part.partDesc;
                if (part.attrs != null) {
                    part.attrList = Object.keys(part.attrs);
                } else {
                    part.attrList = [];
                }
                return part;
            });
            $log.debug("results :", vm.results);
        }, function (error) {
            vm.resultLoading = false;
            $log.debug("Error in response :", error);
        });
        /*} else {
            dataServices.partSearch(SearchBarService.srchStr).then(function (response) {
                $log.debug("Response in Controller else:", response);
                vm.results = response;
                vm.resultSetLimit = response.resultSetLimit;
               // vm.filters = response.filter;
                //$log.debug("vm.filters :", vm.filters);
                vm.results.parts = vm.results.parts.map(function (part) {
                    part.displayName = part.partNumber + ' ' + part.partDesc;
                    if (part.attrs != null) {
                        part.attrList = Object.keys(part.attrs);
                    } else {
                        part.attrList = [];
                    }
                    return part;
                });
                $log.debug("results :", vm.results);
            }, function (error) {
                $log.debug("Error in response :", error);
            });
        }*/
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