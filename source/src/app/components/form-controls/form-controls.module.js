/*
Author : Rohit Rane
*/

import {noSplCharDirective} from './no-spl-char.directive';
import {rightClickDirective} from './right-click.directive';

angular.module('form-controls', [])
  .directive('noSplChar', noSplCharDirective)
  .directive('rightClick', rightClickDirective);