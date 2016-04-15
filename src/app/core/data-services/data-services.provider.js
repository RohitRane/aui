export function dataServices() {
    'ngInject';

    this.$get = dataService;

    function dataService($log, $q, $http, apiConfig) {
        'ngInject';
        
        // Add all the dependencies that need to be used in individual functions here.
        let DI = {
            log: $log,
            http: $http,
            q: $q,
            apiConfig: apiConfig
        };

        return {
            //register your api calls here
            partSearch: partSearch(DI),
            autoSearch: autoSearch(DI),
            catSearch: catSearch(DI),
            part: part(DI)
        }
    }
}

//import your api request files here
import { partSearch } from './requests/part-search.request';
import { autoSearch } from './requests/auto-search.request';
import { catSearch } from './requests/cat-search.request';
import { part } from './requests/part.request';
