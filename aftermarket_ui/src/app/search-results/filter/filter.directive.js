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
    constructor($log, $state, $location, $q, $stateParams, SearchBarService, dataServices, $scope, $rootScope, $timeout, $filter) {
        'ngInject';
        let vm = this;

        vm.DI = () => ({ $log, $state, $q, $location, $stateParams, SearchBarService, dataServices, $scope, $rootScope, $filter});
        $rootScope.$on("$destroy", () => {
            clearCat();
            nullSearch();
            clearAttrFilterEvt();
        });

        

        let clearCat = $rootScope.$on("clearCategoryFilter", function () {
            vm.categoryPristine = [];
            //Rohit's addition : to clear category filters if megamenu navigation used.
            SearchBarService.categoryfilters = [];
            SearchBarService.filters = [];
            vm.listPristine = [];
        });
        let nullSearch = $rootScope.$on("nullSearchCategory", function (event, category) {
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
        $rootScope.$on("breadCrumSearchCategory", function (event, category) {
            for (let obj of vm.categoryPristine) {
                if (category.id == obj.id) {

                    $rootScope.$emit("nullSearchCategory", obj);
                    return;
                }
            }
        });
        //let clearAttrFilterEvt = $rootScope.$on("clearAttrFilter", (evt, appliedFilters) => {
        $scope.$on("clearAttrFilter", (evt, appliedFilters) => {
            console.log(vm.listPristine);
            if (!appliedFilters.length) {
                vm.listPristine = vm.listPristine.map((prist) => {
                    prist.buckets = prist.buckets.map((buckt) => {
                        buckt.select = false;
                        return buckt;
                    });
                    return prist;
                });
                if (vm.listPristine.length) {
                    $rootScope.$emit("clearedFilter");
                }
                //$rootScope.$emit("clearedFilter");
            } else {
                vm.listPristine = vm.listPristine.map((prist) => {
                    let matched = false;
                    angular.forEach(appliedFilters, (appFil) => {
                        if (prist.name === "Brand") {
                        }
                        if (appFil.name.trim() === prist.name.trim()) {
                            matched = true;
                            prist.buckets = prist.buckets.map((buckt) => {
                                buckt.select = false;
                                angular.forEach(appFil.values, (val) => {
                                    if (val === "Spicer") {
                                    }
                                    if (val.trim() === buckt.key.trim()) {
                                        buckt.select = true;
                                    }
                                });
                                return buckt;
                            });
                        }
                        else {
                            if (!matched) {
                                prist.buckets = prist.buckets.map((buckt) => {
                                    buckt.select = false;
                                    return buckt;
                                });
                            }
                        }
                    });
                    return prist;
                });
                if (vm.listPristine.length) {
                    $rootScope.$emit("clearedFilter");
                }
            }
        });
        $rootScope.$on("$destroy", () => {
            clearAttrFilterEvt();
        });
        /* array which holds the updated attributes list */
        vm.listPristine = [];
        /* array which remembers the selected filters to update in new set of filters(retain filters) */
        vm.listPreviousFilter = [];
        /* array which holds the updated attributes category */
        vm.categoryPristine = [];

        vm.categoryHint = sessionStorage.categoryHint;
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
                vm.listPristine = angular.fromJson(sessionStorage.filters);
                //delete sessionStorage.refreshClickedSearch;
            } else {
                vm.resetList();
                //vm.listPreviousFilter = angular.fromJson($stateParams.selectedFilters);
                //debugger;
                vm.listPreviousFilter = SearchBarService.listPreviousFilter;
                if (vm.listPreviousFilter && vm.listPreviousFilter.length >= 1) {
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
                //vm.listPreviousFilter = [];
                //SearchBarService.listPreviousFilter = [];

                /*vm.listPreviousFilter = angular.fromJson($stateParams.filterObject);
                console.log("abhi in vm.list watch", $stateParams.filterObject);
                 if (vm.listPreviousFilter && vm.listPreviousFilter.length > 0) {
                    for (let x of vm.listPristine) {
                        for (let y of vm.listPreviousFilter) {
                            if (x.name == y.name) {
                                for(let m of x.buckets){
                                    for(let n of y.values){
                                        if(m.key == n){
                                            m.select = true;
                                        }
                                    }
                                }
                            }
                        }
                    }   
                }*/
            }
        });
    }

    /* convert categorty to object and put it in categoryPristine */
    resetCategory() {
        let vm = this;
        let { SearchBarService, $stateParams, $rootScope, $filter } = vm.DI();

        /*if(SearchBarService.backBottonPressed){
            console.log("Back in directive restore category ", vm.categoryPristine, SearchBarService.categoryfilters);
            
            vm.categoryPristine = SearchBarService.categoryfilters;
            SearchBarService.backBottonPressed = false;
            return;
        }*/
        if (sessionStorage.refreshClickedSearch) {
            vm.categoryPristine = angular.fromJson(sessionStorage.categoryfilters);
            delete sessionStorage.refreshClickedSearch;
        } else {
            //vm.categoryPristine = SearchBarService.categoryfilters;
            vm.categoryPristine = angular.fromJson(sessionStorage.categoryfilters);
        }


        if (vm.totalCount == 0) {
            vm.categoryPristine = [];
        }
        /* convert array to object */
        if (vm.category && vm.category.length > 0) {
            vm.categoryPristine = $filter("orderBy")(vm.category, 'name');
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
                    collapse: true,
                    id: obj.id,
                    children: tempChildren,
                    viewLimitName: "View less",
                    toggleView: true,
                    viewLimit: tempChildren.length 
                };
            });
        } else {
            if (vm.categoryPristine) {
                if ($stateParams.cat3 && $stateParams.cat2) {
                    vm.categoryPristine = vm.categoryPristine.map(function (obj) {
                        let tempChildren = obj.children.map(function (sub) {
                            return {
                                name: sub.name,
                                select: sub.id == $stateParams.cat3 ? true : false,
                                id: sub.id
                            }
                        });
                        return {
                            name: obj.name,
                            select: obj.id == $stateParams.cat2 ? true : false,
                            //collapse: obj.id == $stateParams.cat2 ? true : false,
                            collapse:  obj.id == $stateParams.cat2 ? true : false,
                            id: obj.id,
                            children: tempChildren,
                            viewLimitName: "View all",
                            toggleView: false,
                            viewLimit: 1 
                        };
                    });
                } else if ($stateParams.cat2) {
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
                            select: obj.id == $stateParams.cat2 ? true : false,
                            //collapse: obj.id == $stateParams.cat2 ? true : false,
                            collapse:   obj.id == $stateParams.cat2 ? true : false,
                            id: obj.id,
                            children: tempChildren,
                            viewLimitName: "View less",
                            toggleView: true,
                            viewLimit: tempChildren.length
                        };
                    });
                } else if ($stateParams.cat3) {
                    vm.categoryPristine = vm.categoryPristine.map(function (obj) {
                        let tempChildren = obj.children.map(function (sub) {
                            return {
                                name: sub.name,
                                select: sub.id == $stateParams.cat3 ? true : false,
                                id: sub.id
                            }
                        });
                        return {
                            name: obj.name,
                            select: false,
                            collapse:   obj.id == $stateParams.cat2 ? true : false,
                            id: obj.id,
                            children: tempChildren,
                            viewLimitName: "View all",
                            toggleView: false,
                            viewLimit: 1 
                        };
                    });
                }
            }
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
        let { $rootScope, $state, $scope, SearchBarService, $stateParams } = vm.DI();
        console.debug("Cat Fill Filter:");
        delete sessionStorage.categoryHint;
        vm.categoryHint = "";
        /*if(selectedCategory.select){
            return;
        }*/

        /*angular.forEach(vm.categoryPristine, function (obj) {
            if (selectedCategory.id == obj.id) {
                selectedCategory.select = !selectedCategory.select;
                obj.select = selectedCategory.select;
                angular.forEach(obj.children, function (child) {
                    child.select = false;
                });
            } else {
                obj.select = false;
                angular.forEach(obj.children, function (child) {
                    child.select = false;
                });
            }
        });*/
        vm.listPreviousFilter = [];
        SearchBarService.sort = null;
        $scope.$emit("checkSearch", SearchBarService.srchStr);
        $rootScope.$broadcast("categoryFilterApplied", { obj: selectedCategory, catFilter: true });
        selectedCategory.select = !selectedCategory.select;
        if (SearchBarService.productLine && SearchBarService.productLine.id == 0) {
            SearchBarService.productLine = selectedCategory;
            let paramObj = { 'filters': "", 'filterObject': "", cat1: selectedCategory.id, "cat2": "", "cat3": "", "from": "", "size": "", "y": $stateParams.y, "mk": $stateParams.mk, "md": $stateParams.md, "sort": "" };
            if($stateParams.ics) {
                paramObj.ics = $stateParams.ics;
            }
            $state.go("searchResults", paramObj);
        } else {
            if (selectedCategory.select) {
                SearchBarService.productClass = selectedCategory;
                SearchBarService.productCategory = 0;
                 let paramObj = { 'filters': "", 'filterObject': "", "cat2": selectedCategory.id, "cat3": "", "from": "", "size": "", "y": $stateParams.y, "mk": $stateParams.mk, "md": $stateParams.md, "sort": "" };
                 if($stateParams.ics) {
                    //paramObj.ics = "";
                    paramObj.cat1 = selectedCategory.id;
                    paramObj.cat2 = "";
                }
                $state.go("searchResults", paramObj);
            } else {
                SearchBarService.productClass = 0;
                let paramObj = { 'filters': "", 'filterObject': "", "cat1": $stateParams.cat1, "cat2": "", "cat3": "", "from": "", "size": "", "y": $stateParams.y, "mk": $stateParams.mk, "md": $stateParams.md, "sort": "" };
                if($stateParams.ics) {
                    //paramObj.ics = "";
                }
                $state.go("searchResults", paramObj);
            }
        }

        /*console.log("SearchBarService.productClass ", SearchBarService.productClass);
        //SearchBarService.productCategory = selectedCategory.name;
        vm.listPreviousFilter = [];
        $scope.$emit("checkSearch", SearchBarService.srchStr);
        //$scope.$emit("searchLaunched");
        $rootScope.$broadcast("categoryFilterApplied", { obj: selectedCategory, catFilter: true });

        let paramObj = {'filters':"", 'filterObject':"","cat2": selectedCategory.id, "cat3":""};
        $state.go("searchResults", paramObj);*/
    }

    /* call api to get the filters for the selected subcategory and selected subcategory should be heighlighted */
    subCategoryFilter(category, selectedSubCategory) {
        let vm = this;
        let { $rootScope, $state, $scope, SearchBarService, $stateParams } = vm.DI();
        delete sessionStorage.categoryHint;
        vm.categoryHint = "";
        /*if(selectedSubCategory.select){
            return;
        }*/
        /* angular.forEach(category.children, function(obj){ 
           if(selectedSubCategory.id == obj.id){
             selectedSubCategory.select = !selectedSubCategory.select;
           }else{
             obj.select = false;
           }
         });*/

        /*angular.forEach(vm.categoryPristine, function (obj) {
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
        });*/
        SearchBarService.listPreviousFilter = [];
        SearchBarService.sort = null;
        $rootScope.$broadcast("categoryFilterApplied");
        selectedSubCategory.select = !selectedSubCategory.select;
        if (selectedSubCategory.select) {
            SearchBarService.productCategory = selectedSubCategory;
            let paramObj = { 'filters': "", 'filterObject': "", "cat2": category.id, "cat3": selectedSubCategory.id, "from": "", "size": "", "y": $stateParams.y, "mk": $stateParams.mk, "md": $stateParams.md, "sort": "" };
            $state.go("searchResults", paramObj);
        } else {
            SearchBarService.productCategory = 0;
            let paramObj = { 'filters': "", 'filterObject': "", "cat1": $stateParams.cat1, "cat2": category.id, "cat3": "", "from": "", "size": "", "y": $stateParams.y, "mk": $stateParams.mk, "md": $stateParams.md, "sort": "" };
            $state.go("searchResults", paramObj);
        }


        //$scope.$emit("searchLaunched");


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

    toggleCategory(category) {
        if (category.toggleView) {
            category.viewLimitName = "View all"
            category.viewLimit = 1;
        } else {
            category.viewLimitName = "View less"
            category.viewLimit = category.children.length;
        }
        category.toggleView = !category.toggleView;
    } 
    
    collapseCategory(category) {
        category.collapse = !category.collapse;
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
    apicall(selectedFilter) {
        let vm = this;
        let { SearchBarService, $q, $stateParams, $rootScope } = vm.DI();
        let prms = () => {
            return $q((resolve) => {
                let vm = this;
                let { $scope, $state, $stateParams, SearchBarService, $location } = vm.DI();
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

                //vm.listPreviousFilter = vm.listPristine;
                SearchBarService.listPreviousFilter = vm.listPristine;
                let temp = [];
                $stateParams.filters ? temp = $stateParams.filters : temp = [];
                temp = angular.fromJson(temp);
                angular.fromJson(temp).push(selectedFilter.key);
                let paramObj = { 'filters': angular.toJson(temp), 'filterObject': angular.toJson(filterObjectArray), "from": "", "size": "", "sort": $stateParams.sort };
                // let paramObj = {'filters':angular.toJson(temp), 'filterObject':angular.toJson(filterObjectArray), 'selectedFilters': angular.toJson(vm.listPristine)};
                $state.go("searchResults", paramObj);
                // $scope.$emit("searchLaunched", filterObjectArray);
                SearchBarService.selectdeFilters = filterObjectArray;
                // vm.selectedItemsChanged({ selectedItems: filterObjectArray });
                resolve();
            });
        }
        return prms();
    }

    launchTreeEvent() {
        let vm = this;
        let {$rootScope} = vm.DI();
        $rootScope.$emit("showOnlyTreeInBC", true);
    }
}

