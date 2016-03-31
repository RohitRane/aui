export class SearchResultsController{
    constructor($log, dataServices) {
        'ngInject';
        
        let vm = this;
        vm.results = {};
        dataServices.partSearch().then(function (response) {
            $log.debug("Response in Controller :", response);
            vm.results = response;
        }, function (error) {
            $log.debug("Error in response :", error);
        });
        
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
}