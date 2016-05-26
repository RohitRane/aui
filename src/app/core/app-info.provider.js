export function AppInfoServiceProvider(apiConfig) {
    'ngInject';
    let vm = this;

    this.$get = appInfoService;
    function appInfoService() {
        let vm = this;
        console.log("get vm :", vm);
        return {
            //register your api calls here
            getAppInfo: vm.getAppInfo,
            setAppInfo: vm.setAppInfo,
            getCat: vm.getCat
        }
    }
    this.getAppInfo = function () {
        console.log("infooooo:",vm._info);
        return vm;
    }


    this.setAppInfo = function (info) {
        this._info = info;
    }


    this.initializeAppInfo = function () {
        console.log("Intializing App Info.");
        let vm = this;
        let initInjector = angular.injector(['ng']);
        let $http = initInjector.get('$http');

        $http(apiConfig.APPINFO).then((response) => {
            console.log("Response in config", response);
            vm._info = response.data.APIResponse;
            console.log("this :", vm);
        }, (error) => {
            console.log("error in config", error);
        });
    }

    /*getCat(parentVM) {
        console.log("PV:",parentVM);
        return function (id) {
            console.log("parent VM :",parentVM);
            console.log("Ctid", id);
            angular.forEach(this._info.cats, (cat) => {
                if (cat.id === id) {
                    console.log("Bingo !!");
                    return cat;
                }
            });
        }
    }*/
    this.getCat = function (id) {
        console.log("Ctid", id);
        angular.forEach(this._info.cats, (cat) => {
            if (cat.id === id) {
                console.log("Bingo !!");
                return cat;
            }
        });

    }
}

