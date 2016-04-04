export function helpNFaqDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/menus/help-n-faq/help-n-faq.html',
        /*scope: {
            //creationDate: '='
        },*/
        controller: HelpNFaqController,
        controllerAs: 'hnf',
        bindToController: true,
        replace:true
    };

    return directive;
}

class HelpNFaqController{
  constructor(){
    
  }
}