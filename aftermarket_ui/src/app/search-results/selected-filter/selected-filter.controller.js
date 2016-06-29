export class SelectedFilterController{
   constructor($log, SearchBarService, $stateParams) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $log, $stateParams, SearchBarService });
}