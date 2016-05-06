/*
Author : Rohit Rane
*/

import { breadCrumbDirective } from './bread-crumb.directive';

angular.module('breadCrumb', ['aftermarket.core'])
    .directive('breadCrumb', breadCrumbDirective);