/*
Author : Rohit Rane
*/

import { pageHeaderDirective } from './header.directive';
import { PageHeaderController } from './header.controller';

angular.module('aftermarket.header', [])
    .directive('pageHeader', pageHeaderDirective)
    .controller('PageHeaderController', PageHeaderController);