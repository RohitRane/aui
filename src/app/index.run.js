export function runBlock($rootScope, $location, SearchBarService) {
    'ngInject';
    
     $rootScope.$on('$locationChangeSuccess', function() {
        if($rootScope.previousLocation == $location.path()) {
            SearchBarService.backBottonPressed = true;
            console.log("Back Button Pressed if ",SearchBarService.backBottonPressed);
        }else{
            SearchBarService.backBottonPressed = false;
            console.log("Back Button Pressed else ", SearchBarService.backBottonPressed);
        }
        $rootScope.previousLocation = $rootScope.actualLocation;
        $rootScope.actualLocation = $location.path();
    });
}
