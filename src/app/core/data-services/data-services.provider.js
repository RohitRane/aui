export function dataServices() {
    'ngInject';

    this.$get = dataService;

    function dataService($log, $q, $http, apiConfig) {
        'ngInject';
        
        // Add all the dependencies that need to be used in individual functions here.
        let dI = {
            log: $log,
            http: $http,
            q: $q,
            apiConfig: apiConfig
        };

        return {
            //register your api calls here
            partSearch: partSearch(dI)
        }
    }
}

//import your api request files here
import { partSearch } from './requests/part-search.request';