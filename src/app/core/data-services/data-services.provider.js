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
            part: part(DI),
            partByPartNum: partByPartNum(DI),
            appInfo: appInfo(DI),
            ymmSearch: ymmSearch(DI),
            orderList: orderList(DI),
            shareList: shareList(DI)
        }
    } 
}

//import your api request files here
import { partSearch } from './requests/part-search.request';
import { autoSearch } from './requests/auto-search.request';
import { catSearch } from './requests/cat-search.request';
import { part } from './requests/part.request';
import { partByPartNum } from './requests/part-by-pnum.request';
import { appInfo } from './requests/app-info.request';
import { ymmSearch } from './requests/ymm-search.request';
import { orderList } from './requests/order-list.request';
import { shareList } from './requests/share-list.request';

