export class SearchBarController {
    constructor($log, $scope, $rootScope, dataServices, SearchBarService) {
        'ngInject';

        let vm = this;
        //Add all the DI this the vm model so that u can use them in the controller functions.
        vm.DI = {
            log: $log,
            dataServices: dataServices,
            SearchBarService : SearchBarService,
            scope: $scope,
            rootScope: $rootScope
        };

        vm.logger = $log;

        vm.search = {
            searchScope: 'Commercial Vehicles',
            typeaheadTemplate: 'app/components/header/search-bar/typeahead.html',
            typeaheadPopupTemplate: 'app/components/header/search-bar/typeahead-popup.html',
            resultCountUpperLimit: 8,
            categories: [
                'Commercial Vehicles',
                'Light Vehicles',
                'Off-Highway',
                'High Performance',
                'Military/Defence',
                'Industrial'
            ]
        };

    }

    textTyped(searchString) {
        let vm = this;
        //vm.DI.rootScope.searchString = searchString;
        vm.DI.SearchBarService.srchStr = searchString;
        return vm.DI.dataServices.autoSearch(searchString).then(function (response) {
            vm.DI.log.debug("Response in Controller : ", response);
            let resultSet = response.parts,
                firstExact = true,
                firstClose = true,
                firstSuggest = true;
            resultSet = resultSet.map(function (part) {
                part.typeId = 2;
                return part;
            });

            angular.forEach(response.lines, function (line) {
                let obj = {
                    lineDesc: line.lineDescription,
                    typeId: 3
                };
                resultSet.push(obj);
            });
            //let resultSet = response.parts.length > vm.search.resultCountUpperLimit ? response.parts.slice(0, vm.search.resultCountUpperLimit) : response.parts;
            angular.forEach(resultSet, function (part, index) {
                if (part.typeId === 1 && firstExact) {
                    part.firstExact = true;
                    firstExact = false;
                } else if (part.typeId === 2 && firstClose) {
                    part.firstClose = true;
                    firstClose = false;
                } else if (part.typeId === 3 && firstSuggest) {
                    part.firstSuggest = true;
                    firstSuggest = false;
                }
                vm.DI.log.debug(vm.DI.rootScope.firstExactIndex + " " + vm.firstCloseIndex + " " + vm.firstSuggestIndex);
            })
            return resultSet.map(function (part) {
                return part;
            });
        }, function (error) {
            vm.DI.log.debug("Error in response :", error);
        });
    }

    focus() {
        let vm = this;
        vm.DI.log.debug("Focus.");
        vm.DI.scope.$emit("searchbarFocussed");

    }

    blur() {
        let vm = this;
        vm.DI.log.debug("Blur.");
        vm.DI.scope.$emit("searchbarBlurred");
    }
    
    searchIconClick(){
        let vm = this;
        vm.DI.log.debug("Click Fired");
    }
}