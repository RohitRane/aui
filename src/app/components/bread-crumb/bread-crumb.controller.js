/*Author:Rohit Rane*/

export class BreadCrumbController {
    constructor($log, $timeout, $rootScope, $state, $scope, $window, $document, $stateParams, SearchBarService, BreadCrumbService) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $state, $window, $document });

        vm._resizeBreadCrumb();

        $scope.$watch(() => {
            return vm.categories;
        }, (n, o) => {
            console.log("categories :", n, o);
            console.log("VM  HERE :", n);
        });

        angular.element($window).bind('resize', () => {
            vm._resizeBreadCrumb();
        });

        if ($state.is('searchResults')) {
            vm.pageState = 'searchResults';
            if ($stateParams.mode && $stateParams.mode === "hierarchy") {
                console.log("STATE PARAMS :", $stateParams);
                vm.cats = [$stateParams.cat1 ? $stateParams.cat1 : false, $stateParams.cat2 ? $stateParams.cat2 : false, $stateParams.cat3 ? $stateParams.cat3 : false];
                console.log("vm.cats", vm.cats);
            } else {
                vm.cats = [false, false, false];
                vm.cats[0] = vm.selMainCategory;
            }

            //console.log("In search page");
        } else if ($state.is('part')) {
            vm.pageState = 'part';
            vm.searchString = SearchBarService.srchStr;
            vm.cats = BreadCrumbService.cats;
            $log.debug("Retained Cats :", vm.cats);
        }



        $log.debug("BreadCrumbService.searchToResults", BreadCrumbService.searchToResults);

        if (BreadCrumbService.searchToResults) {
            vm.showBackButton = true;
            console.log('show bb', vm.showBackButton);
        } else {
            vm.showBackButton = false;
        }
        if (BreadCrumbService.showOnlyTree) {
            vm.showPathCats = true;
            console.log('show only tree', vm.showPathCats);
        } else {
            vm.showPathCats = false;
        }

        console.log("CAts here :", vm.cats);

        let deregistrationCallback = $rootScope.$on("categoryFilterApplied", function (evt, selectedCategory) {
            if ($stateParams.mode !== "hierarchy") {
                $log.debug("Cats before:", vm.cats);
                $log.debug("Cat Fill :", selectedCategory);
                //$log.debug("sel Cat :", vm.selectedCategory);
                if (selectedCategory.catFilter) {
                    $log.debug("Ct fill applie");
                    BreadCrumbService.showOnlyTree = true;
                } else {
                    console.log("Show filter tree false");
                    BreadCrumbService.showOnlyTree = false;
                }
                if (selectedCategory.suggestion) {
                    if (vm.selMainCategory === "All") {
                        vm.cats = [false, false, false];
                        vm.cats[0] = selectedCategory.name;
                    } else {
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

                //console.log("Cats :",cats);

                if (vm.cats[0] === vm.cats[1]) {
                    vm.cats[1] = null;
                }
                if (vm.cats[1] === vm.cats[2]) {
                    vm.cats[2] = null;
                }

                $log.debug("Cats :", vm.cats);
                BreadCrumbService.cats = vm.cats;
            }
            else{
                vm.cats[2] = selectedCategory.name;
            }
        });


        let deregistrationCallback2 = $rootScope.$on("clearCategories", function () {
            $timeout(() => {
                vm.cats = [false, false, false];
                vm.cats[0] = vm.selMainCategory;
            }, 100);
        });

        let ymmEvent = $rootScope.$on("ymmFiltersApplied", (evt, ymm) => {
            vm.ymm = ymm;
            $log.debug("YMM IS :", vm.ymm);
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

    _resizeBreadCrumb() {
        let vm = this;
        let {$window, $document} = vm.DI();

        console.log("Resizing the Breadrumb", $window.innerWidth);
        if ($window.innerWidth > 1440) {
            let mgn = -1 * (($window.innerWidth - 1440) / 2);
            let pdng = -1 * mgn;
            let bdcmb = ($document[0].getElementsByClassName('bread-crumb'))[0];
            angular.element(bdcmb).css("margin-left", mgn + "px");
            angular.element(bdcmb).css("margin-right", mgn + "px");
            angular.element(bdcmb).css("padding-left", pdng + "px");
            angular.element(bdcmb).css("padding-right", pdng + "px");
        }
    }

    sortAction(sortObj) {
        let vm = this;
        let {SearchBarService} = vm.DI();
        // vm.sortItemChanged({selectedFilters:SearchBarService.selectdeFilters, sortItem:sortObj});
    }
    
    showColon(index, cats){
        let vm =this;
        if(index === cats.length-1 && vm.searchString === ""){
            return false;
        }else if(!cats[index+1] && !cats[index+2] && vm.searchString === ""){
            return false;
        }
        else return true;
    }
}