/*
Author : Rohit Rane
*/

import { breadCrumbDirective } from './bread-crumb.directive';
import { BreadCrumbController } from './bread-crumb.controller';

angular.module('breadCrumb', ['aftermarket.core'])
    .directive('breadCrumb', breadCrumbDirective)
    .controller('BreadCrumbController', BreadCrumbController);