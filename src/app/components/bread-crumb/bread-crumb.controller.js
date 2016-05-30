/*Author:Rohit Rane*/

export class BreadCrumbController {
    constructor($log, $timeout, $rootScope, $state, $scope, $window, $document, $stateParams, $interval, SearchBarService, BreadCrumbService, appInfoService) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $state, $window, $document, $timeout, $interval, SearchBarService, appInfoService });

        vm.cats = [false, false, false];
        vm.showAll = BreadCrumbService.showAll;


        vm._resizeBreadCrumb();
        vm.sortItem = vm.sortAttributes[0];
        
        angular.element($window).bind('resize', () => {
            vm._resizeBreadCrumb();
        });

        if ($state.is('searchResults')) {
            vm.pageState = 'searchResults';
            if ($stateParams.mode && $stateParams.mode === "hierarchy") {
                console.log("STATE PARAMS :", $stateParams);
                $timeout(() => {
                    vm._intializeCats();
                }, 100);

                /*vm.cats = [$stateParams.cat1 ? appInfoService.getCat1($stateParams.cat1) : false, $stateParams.cat2 ? appInfoService.getCat2($stateParams.cat1, $stateParams.cat2) : false, $stateParams.cat3 ? appInfoService.getCat3($stateParams.cat1, $stateParams.cat2, $stateParams.cat3) : false];
                console.log("vm.cats", vm.cats);*/
            } else {
                vm.cats = [false, false, false];
                let mainCat = angular.fromJson(vm.selMainCategory);
                if (mainCat.id === 0) {
                    BreadCrumbService.showAll = true;
                    vm.showAll = BreadCrumbService.showAll;
                } else {
                    //vm.cats[0] = angular.fromJson(vm.selMainCategory);
                }

                $timeout(() => {
                    vm._intializeCats();
                }, 100);
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
                vm._intializeCats();
            }
            else {
                vm._intializeCats();
                //vm.cats[2] = selectedCategory.name;
            }
        });


        let deregistrationCallback2 = $rootScope.$on("clearCategories", function () {
            $timeout(() => {
                vm.cats = [false, false, false];
                //vm.cats[0] = vm.selMainCategory;
            }, 100);
        });

        let ymmEvent = $rootScope.$on("ymmFiltersApplied", (evt, ymm) => {
            //debugger;
            vm.ymm = ymm;
            $log.debug("YMM IS :", vm.ymm);
        });

        let showAll = $rootScope.$on("showAll", (evt, status) => {
            BreadCrumbService.showAll = status;
            vm.showAll = status;
        });

        let searchLaunched = $rootScope.$on('searchLaunched', function (event, payload) {
            $timeout(() => {
                vm._intializeCats();
            },200);
        });

        $rootScope.$on('$destroy', function () {
            deregistrationCallback();
            deregistrationCallback2();
            ymmEvent();
            showAll();
            searchLaunched();
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

    showColon(index, cats) {
        let vm = this;
        if (index === cats.length - 1 && vm.searchString === "") {
            return false;
        } else if (!cats[index + 1].id && !cats[index + 2].id && vm.searchString === "") {
            return false;
        }
        else return true;
    }

    _intializeCats() {
        let vm = this;
        let {$interval, SearchBarService, appInfoService} = vm.DI();
        if (SearchBarService.productLine.id) {
            vm.cats[0] = SearchBarService.productLine;
            let intObj = $interval(() => {
                if (appInfoService.appInfo) {
                    vm.cats[1] = SearchBarService.productClass ? SearchBarService.productClass : appInfoService.getCat2WithCat3(SearchBarService.productLine.id, SearchBarService.productCategory?SearchBarService.productCategory.id:null);
                    $interval.cancel(intObj);
                }
            }, 200);
            vm.cats[2] = SearchBarService.productCategory;
            if (vm.cats[2] && vm.cats[2].id === vm.cats[1].id) {
                vm.cats[2] = null;
            } else if (vm.cats[1] && vm.cats[1].id === vm.cats[0].id) {
                vm.cats[1] = null;
            }
        }else{
            vm.cats =[false,false,false]; 
        }
    }
}