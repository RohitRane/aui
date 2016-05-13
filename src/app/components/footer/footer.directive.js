/*Author : Shaifali Jaiswal*/

export function pageFooterDirective(){
	'ngInject' ;

	let directive = {
		restrict:'E',
		templateUrl: 'app/components/footer/footer.html',
		controller: 'PageFooterController',
		controllerAs: 'pgFdr',
        bindToController: true
	};

	return directive;
}