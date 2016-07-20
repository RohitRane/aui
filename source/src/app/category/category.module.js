import {CategoryController} from './category.controller';
import {routeConfig} from './category.route';

angular.module('aftermarket.category', [])
    .config(routeConfig)
    .controller('CategoryController', CategoryController);