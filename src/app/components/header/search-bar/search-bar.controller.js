export class SearchBarController {
    constructor($log, $scope, $location, $rootScope, dataServices, SearchBarService) {
        'ngInject';

        let vm = this;
        //Add all the DI this the vm model so that u can use them in the controller functions.
        vm.DI = () => ({ $log, $scope, $location, $rootScope, dataServices, SearchBarService })
        vm.totalResults = "";
        vm.partNumber = "";
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
        let {$log, $rootScope, dataServices, SearchBarService} = vm.DI();
        //root$scope.searchString = searchString;
        SearchBarService.srchStr = searchString;
        SearchBarService.typeId = 2;
        return dataServices.autoSearch(searchString).then(function (response) {
            $log.debug("Response in Controller : ", response);
            vm.totalResults = response.totalResults;
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
            let obj = {
                    lineDesc: "View All "+ response.totalResults,
                    typeId: 4
             };
             resultSet.push(obj);
            //let resultSet = response.parts.length > vm.search.resultCountUpperLimit ? response.parts.slice(0, vm.search.resultCountUpperLimit) : response.parts;
            angular.forEach(resultSet, function (part) {
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
                $log.debug($rootScope.firstExactIndex + " " + vm.firstCloseIndex + " " + vm.firstSuggestIndex);
            })
            return resultSet.map(function (part) {
                return part;
            });
        }, function (error) {
            $log.debug("Error in response :", error);
        });
    }

    focus() {
        let vm = this;
        let {$log, $scope} = vm.DI();
        $log.debug("Focus.");
        $scope.$emit("searchbarFocussed");
    }

    blur() {
        let vm = this;
        let {$log, $scope} = vm.DI();
        $log.debug("Blur.");

        $scope.$emit("searchbarBlurred");
    }

    productDropDownClick() {
        let vm = this;
        let {$log, $rootScope, SearchBarService} = vm.DI();
        SearchBarService.productLine = vm.search.searchScope;
        $rootScope.$emit("searchIconClicked");
    }

    gotoPartDetails(item, model, label, event) {
        let vm = this;
        let {$log, $location, $rootScope, SearchBarService} = vm.DI();
         SearchBarService.productLine = vm.search.searchScope;
        $log.debug("Item :", item);
        if(item.typeId===3){
            SearchBarService.srchStr = item.lineDesc;
            SearchBarService.typeId = item.typeId;
            $location.path('/search');
        }else if(item.typeId===4){
            vm. searchIconClick();
        }
       else{
           $location.path('/part/' + item.partNumber);
       }        
    }

    searchIconClick() { 
        let vm = this;
        let {$log, $location, $rootScope, SearchBarService} = vm.DI();
        $log.debug("vm.search.searchString ",vm.search.searchString);
        if(vm.search.searchString){
            SearchBarService.productLine = vm.search.searchScope;
            $rootScope.$emit("searchIconClicked");
            $location.path('/search');
        }else{
             $log.debug("$emit");
        }
        
    }
}