export function runBlock($rootScope, $location, $stateParams, $window, SearchBarService, dataServices, OrderListService,  $translate, apiConfig) {
    'ngInject';
    /*Please keep this below code at the top itself and every API call depends on it.*/
    apiConfig.BASEURL = window.env.activeAPIBase;
    apiConfig.ENDPOINT = window.env.endPoint;
    /*Please keep this above code at the top itself and every API call depends on it.*/
    if(sessionStorage.orderId){
        OrderListService.orderId = angular.fromJson(sessionStorage.orderId);
    }else{
        dataServices.orderList().then(function (response) {
            OrderListService.orderId = response;
            sessionStorage.orderId = angular.toJson(response);
        }, function (error) {
        });
    }    
    
    $rootScope.$on('$locationChangeSuccess', function() {
        /*if($rootScope.previousLocation == $location.url() && $location.path() == '/search') {
            SearchBarService.backBottonPressed = true;
            //SearchBarService._retrieveFromSession();
            $rootScope.$emit("backButtonSetSearchString");
        }else{
            SearchBarService.backBottonPressed = false;
            if(sessionStorage.refreshClickedSearch){
            	//SearchBarService._retrieveFromSession();
            }else{
            	//SearchBarService._clearSession();
            }
        }
        $rootScope.previousLocation = $rootScope.actualLocation;
        $rootScope.actualLocation = $location.url();*/
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
