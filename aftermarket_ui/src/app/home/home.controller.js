/*Author:Rohit Rane*/
export class HomeController {
    constructor($rootScope, $scope, $window, $interval, AftermarketConstants, SearchBarService, appInfoService) {
        'ngInject';
        let vm = this;
        $window.scrollTo(0, 0);
        vm.dummyHome = "";
        //vm.dummyHome = AftermarketConstants.skin.home;
        let intvl = $interval(()=>{
        	if(appInfoService.appInfo.cdnBaseurl){
        		$interval.cancel(intvl);
        		vm.dummyHome = "http://"+ appInfoService.appInfo.cdnBaseurl+'/'+AftermarketConstants.skin.home;
        	}
        },100);
        

        //SearchBarService.clearSession();

        //$rootScope.$emit("reachedhome");
    }
}