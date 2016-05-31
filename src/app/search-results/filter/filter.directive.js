export function FilterDirective() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/filter/filter.html',
        scope: {
            list: '=',
            category: '=',
            totalCount: '=',
            selectedItemsChanged: '&'
        },
        controller: FilterDirectiveController,
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;
}

class FilterDirectiveController {
    constructor($log, SearchBarService, dataServices, $scope, $rootScope, $timeout) {
        'ngInject';
        let vm = this;

        vm.DI = () => ({ $log, SearchBarService, dataServices, $scope, $rootScope });
        $rootScope.$on("$destroy",()=>{
            clearCat();
        });

        let clearCat = $rootScope.$on("clearCategoryFilter", function () {
            vm.categoryPristine = [];
            //Rohit's addition : to clear category filters if megamenu navigation used.
            SearchBarService.categoryfilters = [];
        });
        $rootScope.$on("nullSearchCategory", function (event, category) {
            let tempChildren = category.children.map(function (sub) {
                return {
                    name: sub.name,
                    select: false,
                    id: sub.id
                }
            });
            let selectedCategory = {
                name: category.name,
                select: false,
                id: category.id,
                children: tempChildren
            }
            vm.categoryFilter(selectedCategory);
        });
        $rootScope.$on("nullSearchSubCategory", function (event, category, subcategory) {
            let selectedCategory = {
                id: category.id
            };
            let selectedSubCategory = {
                name: subcategory.name,
                select: false,
                id: subcategory.id
            };
            vm.subCategoryFilter(selectedCategory, selectedSubCategory);
        });
        
        /* array which holds the updated attributes list */
        vm.listPristine = [];
        /* array which remembers the selected filters to update in new set of filters(retain filters) */
        vm.listPreviousFilter = [];
        /* array which holds the updated attributes category */
        vm.categoryPristine = [];

        /* watch for the change in category */
        $scope.$watch(function () {
            return vm.category;
        }, function () {
            $timeout(function () {
                vm.resetCategory();
            }, 200);
        });

        /* watch for the change in list */
        $scope.$watch(function () {
            return vm.list;
        }, function () {
            if (SearchBarService.backBottonPressed) {
                vm.listPristine = SearchBarService.filters;
                SearchBarService.backBottonPressed = false;
            } else if (sessionStorage.refreshClickedSearch) {
                vm.listPristine = SearchBarService.filters;
                delete sessionStorage.refreshClickedSearch;
            } else {
                vm.resetList();
                if (vm.listPreviousFilter.length > 1) {
                    for (let x of vm.listPristine) {
                        x.priority = 2;
                        for (let y of vm.listPreviousFilter) {
                            if (x.name == y.name) {
                                if (y.bucketChanged) {
                                    Object.assign(x, y);
                                    x.priority = 1;
                                }
                                break;
                            }
                        }
                    }
                }
                SearchBarService.filters = vm.listPristine;
                vm.listPreviousFilter = [];
            }
        });
    }

    /* convert categorty to object and put it in categoryPristine */
    resetCategory() {
        let vm = this;
        let { SearchBarService, $rootScope } = vm.DI();

        /*if(SearchBarService.backBottonPressed){
            console.log("Back in directive restore category ", vm.categoryPristine, SearchBarService.categoryfilters);
            
            vm.categoryPristine = SearchBarService.categoryfilters;
            SearchBarService.backBottonPressed = false;
            return;
        }*/

        console.log("Back in directive", SearchBarService.categoryfilters);
        vm.categoryPristine = SearchBarService.categoryfilters;

        if (vm.totalCount == 0) {
            vm.categoryPristine = [];
        }

        /* convert array to object */
        if (vm.category.length > 0) {
            vm.categoryPristine = vm.category;
            vm.categoryPristine = vm.categoryPristine.map(function (obj) {
                let tempChildren = obj.children.map(function (sub) {
                    return {
                        name: sub.name,
                        select: false,
                        id: sub.id
                    }
                });
                return {
                    name: obj.name,
                    select: false,
                    id: obj.id,
                    children: tempChildren
                };
            });
        }

        /* In case of only one product line filters should be shown along with the category */
        if (vm.category.length == 1) {
            //vm.categoryFilter(vm.categoryPristine[0]);
            //vm.categoryPristine[0].select = true;
        }


        SearchBarService.categoryfilters = vm.categoryPristine;

    }

    /* call api to get the filters for the selected category and selected category should be heighlighted */
    categoryFilter(selectedCategory) {
        let vm = this;
        let { $rootScope, $scope, SearchBarService } = vm.DI();
        console.debug("Cat Fill Filter:");

        vm.count = true;
        angular.forEach(vm.categoryPristine, function (obj) {
            if (selectedCategory.id == obj.id) {
                console.log("Back in directive if", obj);
                selectedCategory.select = !selectedCategory.select;
                obj.select = selectedCategory.select;
            } else {
                console.log("Back in directive else", obj);
                obj.select = false;
                angular.forEach(obj.children, function (child) {
                    child.select = false;
                });
            }
        });
        if (SearchBarService.productLine.id == 0) {
            SearchBarService.productLine = selectedCategory;
        } else {
            if (selectedCategory.select) {
                SearchBarService.productClass = selectedCategory;
                SearchBarService.productCategory = 0;
            } else {
                SearchBarService.productClass = 0;
            }
        }

        console.log("SearchBarService.productClass ", SearchBarService.productClass);
        //SearchBarService.productCategory = selectedCategory.name;
        vm.listPreviousFilter = [];
        $scope.$emit("checkSearch", SearchBarService.srchStr);
        $scope.$emit("searchLaunched");
        $rootScope.$broadcast("categoryFilterApplied", { obj: selectedCategory, catFilter: true });

    }

    /* call api to get the filters for the selected subcategory and selected subcategory should be heighlighted */
    subCategoryFilter(category, selectedSubCategory) {
        let vm = this;
        let { $rootScope, $scope, SearchBarService } = vm.DI();

        /* angular.forEach(category.children, function(obj){ 
           if(selectedSubCategory.id == obj.id){
             selectedSubCategory.select = !selectedSubCategory.select;
           }else{
             obj.select = false;
           }
         });*/

        angular.forEach(vm.categoryPristine, function (obj) {
            if (category.id == obj.id) {
                if (category.select) {
                } else {
                    SearchBarService.productClass = 0;
                }
                angular.forEach(obj.children, function (child) {
                    if (selectedSubCategory.id == child.id) {
                        selectedSubCategory.select = !selectedSubCategory.select;
                        child.select = selectedSubCategory.select;
                    } else {
                        child.select = false;
                    }
                });
            } else {
                obj.select = false;
                angular.forEach(obj.children, function (child) {
                    child.select = false;
                });
            }
        });

        if (selectedSubCategory.select) {
            SearchBarService.productCategory = selectedSubCategory;
        } else {
            SearchBarService.productCategory = 0;
        }

        $scope.$emit("searchLaunched");
        $rootScope.$broadcast("categoryFilterApplied");

    }

    /* add extra properties to list and put in listPristine  */
    pushCheckboxData(x) {
        let vm = this;
        let obj = {};
        vm.tempBuckets = [];

        angular.forEach(x.buckets, function (obj) {
            vm.tempBuckets.push({
                key: obj.key,
                count: obj.count,
                select: false
            });
        });

        obj = {
            name: x.name,
            type: x.type,
            buckets: vm.tempBuckets,
            viewSelect: x.buckets.length > 1 ? "Select All" : '',
            toggleSelect: false,
            viewLimitName: "View all",
            toggleView: false,
            viewLimit: 4
        };
        return obj;
    }

    /* categorize the filter based on their types */
    resetList() {
        let vm = this;
        let { SearchBarService } = vm.DI();
        console.log("Back in directive filter ", SearchBarService.backBottonPressed);
        vm.listPristine = [];
        for (let x of vm.list) {
            vm.listPristine.push(vm.pushCheckboxData(x));
        }
    }

    /* togglet the SelectAll and Unselect */
    toggleselect(list) {
        let vm = this;
        if (list.toggleSelect) {
            list.viewSelect = "Select All";
            angular.forEach(list.buckets, function (obj) {
                obj.select = false
            });
        } else {
            list.viewSelect = "Unselect All";
            angular.forEach(list.buckets, function (obj) {
                obj.select = true
            });
        }
        list.toggleSelect = !list.toggleSelect;
        vm.apicall();
    }

    /* togglet the View all and View less */
    toggleview(list) {
        if (list.toggleView) {
            list.viewLimitName = "View all"
            list.viewLimit = 4;
        } else {
            list.viewLimitName = "View less"
            list.viewLimit = list.buckets.length;
        }
        list.toggleView = !list.toggleView;
    }

    /* call the api to get the filters and categories */
    apicall() {
        let prms = () => new Promise((resolve) => {
            let vm = this;
            let { $scope, SearchBarService } = vm.DI();
            let filterObjectArray = [];

            $scope.$emit("checkSearch", SearchBarService.srchStr);
            /* put all the selected filters in filterObjectArray */
            for (let x of vm.listPristine) {
                let filterArray = [];
                let filterObject = {};

                for (let obj = 0; obj < x.buckets.length; obj++) {
                    x.buckets[obj].select ? filterArray.push(x.buckets[obj].key) : "";
                }

                if (filterArray.length) {
                    filterObject = {
                        name: x.name,
                        type: x.type,
                        values: filterArray
                    };
                    filterObjectArray.push(filterObject);
                    x.bucketChanged = true;
                } else {
                    x.bucketChanged = false;
                }
            }
            vm.listPreviousFilter = vm.listPristine;
            // $scope.$emit("searchLaunched", filterObjectArray);
            SearchBarService.selectdeFilters = filterObjectArray;
            vm.selectedItemsChanged({ selectedItems: filterObjectArray });
            resolve();
        });
        return prms();
    }

    launchTreeEvent() {
        let vm = this;
        let {$rootScope} = vm.DI();
        $rootScope.$emit("showOnlyTreeInBC", true);
    }
}

