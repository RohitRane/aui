import {HomeController} from './home.controller';
import {routeConfig} from './home.route';

angular.module('aftermarket.home', [])
    .config(routeConfig)
    .controller('HomeController', HomeController);