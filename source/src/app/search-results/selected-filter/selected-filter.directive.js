export function SelectedFilter() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/selected-filter/selected-filter.html',
        scope: {},
        controller: SelectedFilterController,
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;
}

class SelectedFilterController {
    constructor($log, $state, $location, $q, $stateParams, SearchBarService, dataServices, $scope, $rootScope, $timeout) {
        'ngInject';
        let vm = this;

        vm.DI = () => ({ $log, $state, $q, $location, $stateParams, SearchBarService, dataServices, $scope, $rootScope });

        vm.selectedFilter = angular.fromJson($stateParams.filterObject);
        

        //vm.listPristine = SearchBarService.filters;
    }

    changeInService(deleteObj, deleteValue){
        let vm = this;
        let { SearchBarService, $stateParams, $state, $rootScope } = vm.DI();
        vm.listPreviousFilter = SearchBarService.listPreviousFilter;
        for(let obj of vm.listPreviousFilter){
            if(obj.name == deleteObj.name){
                for(let x of obj.buckets){
                    if(x.key == deleteValue){
                        x.select = false;
                        SearchBarService.listPreviousFilter = vm.listPreviousFilter;
                        let paramObj = {'filterObject': angular.toJson(vm.selectedFilter)};
                        $state.go('searchResults', paramObj);
                    }
                }
            }
        }
    }

    delete(deleteObj, deleteValue){
        let vm = this;
        let { SearchBarService, $stateParams, $state, $rootScope } = vm.DI();
        for(let obj of vm.selectedFilter){
            if(deleteObj.name == obj.name){
                for(let x of obj.values){
                    if(x == deleteValue){
                        obj.values.splice(obj.values.indexOf(x), 1);
                        vm.changeInService(deleteObj, deleteValue);
                    }
                }
            }
        }
    }
}