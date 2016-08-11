/*
Author : Rohit Rane
*/

import {noSplCharDirective} from './no-spl-char.directive';
import {rightClickDirective} from './right-click.directive';
import {imgProtectorDirective} from './img-protector.directive';

angular.module('form-controls', [])
  .directive('noSplChar', noSplCharDirective)
  .directive('rightClick', rightClickDirective)
  .directive('img', imgProtectorDirective);