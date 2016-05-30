export function OtherResultDirective(){
	'ngInject';

	let directive = {
		restrict : 'E',
		templateUrl : 'app/search-results/null-search/other-result.html',
		controller : OtherResultDirectiveController,
		controllerAs : 'otherresult',
		bindToContrller : true
	};
	return directive;
}

class  OtherResultDirectiveController{
	constructor(){
		'ngInject';
	}
	
}