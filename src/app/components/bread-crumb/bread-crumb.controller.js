/*Author:Rohit Rane*/

export class BreadCrumbController {
    constructor($log, $timeout, $rootScope, $state, $scope, SearchBarService, BreadCrumbService) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $state });

        $scope.$watch(() => {
            return vm.categories;
        }, (n, o) => {
            console.log("categories :", n, o);
            console.log("VM  HERE :", n);
        });


        if ($state.is('searchResults')) {
            vm.pageState = 'searchResults';
            //console.log("In search page");
        } else if ($state.is('part')) {
            vm.pageState = 'part';
            vm.searchString = SearchBarService.srchStr;
        }

        vm.cats = [false, false, false];
        vm.cats[0] = vm.selMainCategory;


        if (BreadCrumbService.searchToResults) {
            vm.showBackButton = true;
        } else {
            vm.showBackButton = false;
        }

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

    showSubsetInfo(totalResults, resultSetLimit) {
        let retValue = false;
        console.log("Type OF :", typeof (totalResults));
        (Number(totalResults) > Number(resultSetLimit)) ? retValue = true : retValue = false;
        return retValue;
    }

    goToSearch() {
        let vm = this;
        let {$state} = vm.DI();
        $state.go("searchResults");
    }
}