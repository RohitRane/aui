import {dataServices} from './data-services/data-services.provider';
import {apiConfig} from './data-services/api.config';
import {AppInfoService} from './app-info.service';

angular.module('aftermarket.core', [])
    .constant('apiConfig', apiConfig)
    .provider('dataServices', dataServices)
    .service('appInfoService', AppInfoService);