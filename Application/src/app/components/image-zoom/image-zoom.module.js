/*
Author : Rohit Rane
*/

import { imageZoomDirective } from './image-zoom.directive';

angular.module('imageZoom', ['aftermarket.core'])
    .directive('imageZoom', imageZoomDirective);