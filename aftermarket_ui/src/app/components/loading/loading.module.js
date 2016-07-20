import { LoadingDirective } from './loading.directive';
import { LoadingController } from './loading.controller';

angular.module('loading', [])
	.directive('loadingDirective', LoadingDirective)
	.controller('LoadingController', LoadingController);