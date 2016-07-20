import { SendingDirective } from './sending.directive';
import { SendingController } from './sending.controller';

angular.module('sending', [])
	.directive('sendingDirective', SendingDirective)
	.controller('SendingController', SendingController);