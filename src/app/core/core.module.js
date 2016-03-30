import {dataServices} from './data-services/data-services.provider';
import {apiConfig} from './data-services/api.config';

angular.module('aftermarket.core', [])
    .constant('apiConfig',apiConfig)
    .provider('dataServices',dataServices);