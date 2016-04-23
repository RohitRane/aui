export class SearchResultsController {
    constructor($log, $rootScope, $scope, $timeout, dataServices, SearchBarService) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $log, $scope, $timeout, dataServices, SearchBarService });
        vm.searchString = "";
        
        $timeout(function () {
            $scope.$emit("searchbarBlurred");
        });
            
        $rootScope.$on('searchLaunched', function (event, data) {
            $log.debug("$on", data);
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
       /* this.filters = [
            {
                "name": "Check Box",
                "id": "c1",
                "type": "string",
                "options": [{value:"HR Style",selected:false}, {value:"BP Style",selected:false}, {value:"OSR Style", selected:false}, {value:"BP Style",selected:false}, {value:"HR Style2",selected:false}, {value:"BP Style2",selected:false}]
            },
            {
                "name": "Check Box1",
                "id": "v1",
                "type": "string",
                "options": [{value:"HR Style",selected:false}, {value:"BP Style",selected:false}, {value:"OSR Style", selected:false}, {value:"BP Style",selected:false}, {value:"HR Style2",selected:false}, {value:"BP Style2",selected:false}]
            },
            {
                "name": "Scale",
                "id": "s1",
                "type": "number",
                "options": [10,20, 5, 8, 25, 30]
            }
        ];*/
        
        this.filters =  [{
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
                }, {
                    "key": "BP Style",
                    "count": 5
                }, {
                    "key": "HR Style",
                    "count": 5
                }, {
                    "key": "BP/WB Style",
                    "count": 1
                }, {
                    "key": "ISR/WB Style",
                    "count": 1
                }, {
                    "key": "OSR/ISR Style",
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
                "name": "AXEL",
                "type": "NUMERIC",
                "buckets": [{
                    "key": "n1",
                    "count": 25
                }, {
                    "key": "n2",
                    "count": 8
                },{
                    "key": "n3",
                    "count": 10
                },{
                    "key": "n4",
                    "count": 20
                }]
            }, {
                "name": "SPICER",
                "type": "NUMERIC",
                "buckets": [{
                    "key": "ns1",
                    "count": 25
                }, {
                    "key": "ns2",
                    "count": 25
                },{
                    "key": "ns3",
                    "count": 15
                },{
                    "key": "ns4",
                    "count": 35
                }]
            }];
    }
    
    change(action){
        let vm = this;
        let {$log} = vm.DI();
         $log.debug("Action", action);
    }
    
    getParts() {
        let vm = this;
        let {$log, dataServices, SearchBarService, $scope} = vm.DI();
        $scope.$emit("searchbarBlurred");
        vm.searchString = SearchBarService.srchStr;
        vm.productLine = SearchBarService.productLine;

        //let typeId = SearchBarService.typeId;
        /*if (typeId === 4) {*/
            dataServices.catSearch(SearchBarService.srchStr, SearchBarService.productLine).then(function (response) {
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
}