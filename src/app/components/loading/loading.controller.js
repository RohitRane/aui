export class LoadingController {
    constructor($scope,$rootScope,$log) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $scope,$rootScope,$log });
        vm.loading = false;
    }
}
