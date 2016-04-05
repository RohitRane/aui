export class SearchBarController {
    constructor($log, $scope, dataServices) {
        'ngInject';

        let vm = this;
        //Add all the DI this the vm model so that u can use them in the controller functions.
        vm.DI = {
            log: $log,
            dataServices: dataServices,
            scope:$scope
        };

        vm.logger = $log;

        vm.search = {
            searchScope: 'Commercial Vehicles',
            typeaheadTemplate: 'app/components/header/search-bar/typeahead.html',
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

    textTyped() {
        let vm = this;
        return vm.DI.dataServices.partSearch().then(function (response) {
            let resultSet = response.parts.length > vm.search.resultCountUpperLimit ? response.parts.slice(0, vm.search.resultCountUpperLimit) : response.parts;
            return resultSet.map(function (part) {
                return part;
            });
        }, function (error) {
            vm.DI.log.debug("Error in response :", error);
        });
    }
    
    focus(){
        let vm = this;
        vm.DI.log.debug("Focus.");
        vm.DI.scope.$emit("searchbarFocussed");
        
    }
    
    blur(){
        let vm = this;
        vm.DI.log.debug("Blur.");
        vm.DI.scope.$emit("searchbarBlurred");
    }
}