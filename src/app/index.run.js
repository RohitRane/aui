export function runBlock($rootScope, $location, SearchBarService, dataServices, OrderListService, $window) {
    'ngInject';
    dataServices.orderList().then(function (response) {
            OrderListService.orderId = response;
        }, function (error) {
        });

    $rootScope.$on('$locationChangeSuccess', function() {
    	
        if($rootScope.previousLocation == $location.path() && $location.path() == '/search') {
            SearchBarService.backBottonPressed = true;
            SearchBarService._retrieveFromSession();
            $rootScope.$emit("backButtonSetSearchString");
            console.log("Back in run if ", sessionStorage.refreshClickedSearch);
        }else{
            SearchBarService.backBottonPressed = false;
            if(sessionStorage.refreshClickedSearch){console.log("Back in run else START", sessionStorage.refreshClickedSearch);
            	SearchBarService._retrieveFromSession();
            }else{
            	//SearchBarService._clearSession();
            }
            console.log("Back in run else ", sessionStorage.refreshClickedSearch);
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
