/*
Author : Rohit Rane
*/

import { imageZoomDirective } from './image-zoom.directive';
import { ImageZoomController } from './image-zoom.controller';

angular.module('imageZoom', ['aftermarket.core'])
    .directive('imageZoom', imageZoomDirective)
    .controller('ImageZoomController', ImageZoomController);