export class SelectedFilterController{
   constructor($log, SearchBarService, $stateParams, $translate) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ $log, $stateParams, SearchBarService });
}