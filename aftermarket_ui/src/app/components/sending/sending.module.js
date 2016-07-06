import { LoadingDirective } from './sending.directive';
import { LoadingController } from './sending.controller';

angular.module('sending', [])
	.directive('sendingDirective', SendingDirective)
	.controller('SendingController', SendingController);