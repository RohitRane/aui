/*
Author : Rohit Rane
*/

import { breadCrumbDirective } from './bread-crumb.directive';
import { BreadCrumbController } from './bread-crumb.controller';
import { BreadCrumbService } from './bread-crumb.service';

angular.module('breadCrumb', ['aftermarket.core'])
    .directive('breadCrumb', breadCrumbDirective)
    .service('BreadCrumbService', BreadCrumbService)
    .controller('BreadCrumbController', BreadCrumbController);