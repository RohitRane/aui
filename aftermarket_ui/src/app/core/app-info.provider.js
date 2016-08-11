export function AppInfoServiceProvider(apiConfig) {
    'ngInject';
    let vm = this;

    this.$get = appInfoService;
    function appInfoService() {
        let vm = this;
        return {
            //register your api calls here
            getAppInfo: vm.getAppInfo,
            setAppInfo: vm.setAppInfo,
            getCat: vm.getCat
        }
    }
    this.getAppInfo = function () {
        return vm;
    }


    this.setAppInfo = function (info) {
        this._info = info;
    }


    this.initializeAppInfo = function () {
        let vm = this;
        let initInjector = angular.injector(['ng']);
        let $http = initInjector.get('$http');

        $http(apiConfig.APPINFO).then((response) => {
            vm._info = response.data.APIResponse;
        }, (error) => {
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
        angular.forEach(this._info.cats, (cat) => {
            if (cat.id === id) {
                //console.log("Bingo !!");
                return cat;
            }
        });

    }
}

