export class SearchBarController {
    constructor($log, dataServices) {
        'ngInject';

        let vm = this;
        //Add all the DI this the vm model so that u can use them in the controller functions.
        vm.logger = $log;
        
        vm.search = {
            searchScope: 'All',
            typeaheadTemplate: 'app/components/header/search-bar/typeahead.html',
            categories: [
                'Commercial Vehicles',
                'Light Vehicles',
                'Off-Highway',
                'High Performance',
                'Military/Defence',
                'Industrial'
            ]
        };
        
        dataServices.partSearch().then(function (response) {
            $log.debug("Response in Controller :", response);
            vm.search.results = response.parts;
            $log.debug("Search OBj :",vm.search);
        }, function (error) {
            $log.debug("Error in response :", error);
        });

    }

    textTyped() {
        let vm = this;
        vm.logger.debug("change fired.", this.search.searchString);
    }
}