export function profileMenuDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/menus/profile/profile.html',
        /*scope: {
            //creationDate: '='
        },*/
        controller: ProfileMenuController,
        controllerAs: 'profile',
        bindToController: true,
        replace:true
    };

    return directive;
}

class ProfileMenuController{
  constructor(){
    
  }
}