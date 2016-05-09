/*Author:Rohit Rane*/

export class BreadCrumbController {
    constructor($log, $timeout, $rootScope) {
        'ngInject';

        let vm = this;

        let deregistrationCallback = $rootScope.$on("categoryFilterApplied", function (evt, selectedCategory) {
            $log.debug("Cat Fill :", selectedCategory);
            $log.debug("sel Cat :", vm.selectedCategory);
            if (vm.selectedCategory === null || angular.isUndefined(vm.selectedCategory)) {
                vm.selectedCategory = selectedCategory;
            } else if (vm.selMainCategory === "All") {
                if (vm.selSubCategory === null || angular.isUndefined(vm.selSubCategory)) {
                    vm.selSubCategory = selectedCategory;
                }
                else {
                    vm.selSubCategory = selectedCategory;
                }
            }
            else {
                vm.selectedCategory = selectedCategory;
            }
        });
        $rootScope.$on('$destroy', deregistrationCallback);

        let deregistrationCallback2 = $rootScope.$on("clearCategories", function () {
            vm.selectedCategory = vm.selSubCategory = null;
        });
    }
}