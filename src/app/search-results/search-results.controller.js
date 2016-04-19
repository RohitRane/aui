export class SearchResultsController {
    constructor($log, $rootScope, $scope, $timeout, dataServices, SearchBarService) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $scope, $timeout, dataServices, SearchBarService });
        vm.searchString = "";
        
        $timeout(function () {
            $scope.$emit("searchbarBlurred");
        });
            
        $rootScope.$on('searchLaunched', function () {
            $log.debug("$on");
            vm.getParts();
        });
        
        vm.results = {};

        vm.getParts();
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
        this.filters = [
            {
                "name": "Radio",
                "id": "u1",
                "type": "list",
                "multiSelect": false,
                "options": ["yes", "no"]
            },
            {
                "name": "Check Box",
                "id": "t1",
                "type": "list",
                "multiSelect": true,
                "options": ["HR Style", "BP Style", "OSR Style"]
            },
            {
                "name": "Scale",
                "id": "s1",
                "type": "scale"
            },
            {
                "name": "Search",
                "id": "sr1",
                "type": "search",
                "options": ["HR Style", "BP Style", "OSR Style"]
            }
        ];
    }
    
    change(action){
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
         $log.debug("Action", action);
    }
    
    getParts() {
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        
        $scope.$emit("searchbarBlurred");
        $log.debug("SEARCH STR", SearchBarService.srchStr);
        vm.searchString = SearchBarService.srchStr;
        vm.productLine = SearchBarService.productLine;

        let typeId = SearchBarService.typeId;
        if (typeId === 4) {
            dataServices.catSearch(SearchBarService.srchStr).then(function (response) {
                $log.debug("Response in Controller :", response);
                vm.results = response;
                vm.resultSetLimit = response.resultSetLimit;

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
        } else {
            dataServices.partSearch(SearchBarService.srchStr).then(function (response) {
                $log.debug("Response in Controller :", response);
                vm.results = response;
                vm.resultSetLimit = response.resultSetLimit;

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
        }
    }
}