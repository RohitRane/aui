/*Author : Shaifali Jaiswal*/


import { PagefooterController } from './footer.controller';
import { pageFooterDirective } from './footer.directive';

angular.module('aftermarket.footer', ['aftermarket.core'])
    .controller('PagefooterController', PagefooterController)
    .directive('pageFooter',pageFooterDirective);