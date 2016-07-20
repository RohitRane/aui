import {routeConfig} from './alt-home.route';
import {AltHomeController} from './alt-home.controller';

angular.module('aftermarket.alt-home', [])
    .config(routeConfig)
    .controller('AltHomeController',AltHomeController);