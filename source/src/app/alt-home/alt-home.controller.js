/*Author:Rohit Rane*/
export class AltHomeController {
    constructor($rootScope, $scope, $window, $document, AftermarketConstants, SearchBarService, dataServices, appInfoService) {
        'ngInject';
        let vm = this;
        $window.scrollTo(0, 0);
        vm.dummyHome = AftermarketConstants.skin.home;

        SearchBarService.clearSession();

        $rootScope.$emit("reachedhome");

        angular.element($document[0].getElementById("vidFrame")).attr("width", $window.innerWidth);
        angular.element($document[0].getElementById("vidFrame")).attr("height", $window.innerWidth*0.5625);

        angular.element($document[0].getElementById("middle")).css("left", $window.innerWidth / 7.5 + "px");
        angular.element($document[0].getElementById("middle")).css("top", $window.innerHeight / 2.5 + "px");
        
        angular.element($document[0].getElementById("logo")).css("margin-left", $window.innerWidth / 3 + "px");
        angular.element($document[0].getElementById("logo")).css("margin-bottom", "10px");

        dataServices.appInfo().then(response => {
            appInfoService.appInfo = response;
        }, error => {

        });
    }

    clickeMe() {
        alert("hurrat");
    }
}