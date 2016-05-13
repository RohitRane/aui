export function runBlock($rootScope, $location, SearchBarService, $window) {
    'ngInject';
    
    $rootScope.$on('$locationChangeSuccess', function() {
    	
        if($rootScope.previousLocation == $location.path() && $location.path() == '/search') {
            SearchBarService.backBottonPressed = true;
            console.log("Back in run if ",sessionStorage.srchStr, SearchBarService.backBottonPressed, sessionStorage.refreshClickedSearch);
        }else{
            SearchBarService.backBottonPressed = false;
             console.log("Back in run else ", sessionStorage.srchStr, SearchBarService.backBottonPressed, sessionStorage.refreshClickedSearch);
            if(sessionStorage.refreshClickedSearch || $location.path() == '/search'){
            }else{
            	SearchBarService._clearSession();
            }
            console.log("Back in run else CLEAR", sessionStorage.srchStr, SearchBarService.backBottonPressed, sessionStorage.refreshClickedSearch);
        }
        $rootScope.previousLocation = $rootScope.actualLocation;
        $rootScope.actualLocation = $location.path();
    });

    var windowElement = angular.element($window);
	windowElement.on('beforeunload', function (event) {
		if($location.path() == '/search'){
			sessionStorage.refreshClickedSearch = true;
		}else{
			delete sessionStorage.refreshClickedSearch;
		}
	});
}
