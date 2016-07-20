/*Author : Shaifali Jaiswal*/


import { PageFooterController } from './footer.controller';
import { pageFooterDirective } from './footer.directive';

angular.module('aftermarket.footer', ['aftermarket.core'])
    .controller('PageFooterController', PageFooterController)
    .directive('pageFooter',pageFooterDirective);