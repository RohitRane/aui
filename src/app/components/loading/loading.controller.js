export class LoadingController {
    constructor($scope,$rootScope,$log) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $scope,$rootScope,$log });
        vm.loading = false;
        
        $rootScope.$on('showLoading', function(event, flag){console.log("loading controller ",flag);
        	vm.loading = flag;
        });
    }
}
