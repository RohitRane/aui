import {dataServices} from './data-services/data-services.provider';
import {apiConfig} from './data-services/api.config';
import {AppInfoService} from './app-info.service';
import {AppInfoServiceProvider} from './app-info.provider';

angular.module('aftermarket.core', [])
    .constant('apiConfig', apiConfig)
    .provider('dataServices', dataServices)
    .service('appInfoService', AppInfoService);
    //.provider('appInfoService', AppInfoServiceProvider);