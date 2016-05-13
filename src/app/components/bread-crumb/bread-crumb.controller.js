/*Author:Rohit Rane*/

export class BreadCrumbController {
    constructor($log, $timeout, $rootScope, SearchBarService) {
        'ngInject';

        let vm = this;

        
        vm.cats = [false, false, false];
        vm.cats[0] = vm.selMainCategory;


        console.log("CAts here :", vm.cats);

        let deregistrationCallback = $rootScope.$on("categoryFilterApplied", function (evt, selectedCategory) {
            $log.debug("Cats before:", vm.cats);
            $log.debug("Cat Fill :", selectedCategory);
            //$log.debug("sel Cat :", vm.selectedCategory);
            if (selectedCategory.suggestion) {
                if (vm.selMainCategory === "All") {
                    console.log("Hurray");
                    vm.cats = [false, false, false];
                    vm.cats[0] = selectedCategory.name;
                } else {
                    console.log("Hip hip");
                    vm.cats = [false, false, false];
                    vm.cats[0] = vm.selMainCategory;
                    vm.cats[1] = selectedCategory.name;
                }
            }
            else {
                if (!vm.cats[1]) {
                    vm.cats[1] = selectedCategory.name;
                } else if (vm.cats[0] !== "All") {
                    vm.cats[1] = selectedCategory.name;
                } else {
                    vm.cats[2] = selectedCategory.name;
                }
            }
            
            /*if (vm.cats[1] === null || angular.isUndefined(vm.cats[1])) {
                vm.cats[1] = selectedCategory.name;
            } else if (vm.cats[0] === "All") {
                if (vm.cats[2] === null || angular.isUndefined(vm.cats[2])) {
                    vm.cats[2] = selectedCategory.name;
                }
                else {
                    vm.cats[2] = selectedCategory.name;
                }
            }
            else {
                vm.cats[1] = selectedCategory.name;
            }*/
            $log.debug("Cats :", vm.cats);
        });


        let deregistrationCallback2 = $rootScope.$on("clearCategories", function () {
            $timeout(() => {
                vm.cats = [false, false, false];
                vm.cats[0] = vm.selMainCategory;
            }, 100);
        });

        $rootScope.$on('$destroy', function () {
            deregistrationCallback();
            deregistrationCallback2();
        });
    }

    showSubsetInfo(totalResults, resultSetLimit){
        let retValue = false;
        console.log("Type OF :",typeof(totalResults));
        (Number(totalResults) > Number(resultSetLimit))?retValue = true : retValue = false;
        return retValue;
    }
}