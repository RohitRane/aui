import {PartController} from './part.controller';
import {routeConfig} from './part.route';

angular.module('aftermarket.part', [])
    .config(routeConfig)
    .controller('PartController', PartController);