export class SearchBarController {

    constructor($log, $scope, $location, $rootScope, $document, $timeout, $window, $interval, $state, $stateParams, dataServices, SearchBarService, BreadCrumbService, appInfoService, YmmService, $translate) {


        'ngInject';

        let vm = this;
        //Add all the DI this the vm model so that u can use them in the controller functions.


        vm.DI = () => ({ $log, $scope, $location, $rootScope, $document, $timeout, $window, $state, dataServices, BreadCrumbService, SearchBarService, appInfoService, YmmService, $stateParams });


        let deregistrationCallback = $rootScope.$on("reachedhome", function () {
            vm.search.searchString = null;
            SearchBarService.ymmFilter = null;
            YmmService.emptyLevelData();
            vm.search.searchScope = appInfoService.getCat1(0);
        });
        $rootScope.$on('$destroy', deregistrationCallback);

        let applyHierarchyScope = $rootScope.$on("applyHierarchyScope", (evt, cat) => {
            vm.search.searchScope = cat;
            $timeout(() => {
                vm._setWidthSearchBox();
            }, 50);
        });
        $rootScope.$on('$destroy', applyHierarchyScope);

        let deregistrationCallback2 = $rootScope.$on("categoryFilterApplied", function (evt, selectedCategory) {
            if (vm.search.searchScope.id === 0) {
                vm.search.searchScope = appInfoService.getCat1(0);
                //vm.search.searchScope = appInfoService.getCat1(selectedCategory.id);
                $timeout(() => {
                    vm._setWidthSearchBox();
                }, 50);
            }
        });
        $rootScope.$on('$destroy', deregistrationCallback2);

        vm.totalResults = "";
        vm.partNumber = "";
        vm.logger = $log;

        $rootScope.$on('checkSearch', function (event, previousSearchString) {
            vm.search.searchString = previousSearchString;
        });

        vm.search = {
            searchScope: {},
            typeaheadTemplate: 'app/components/header/search-bar/typeahead.html',
            typeaheadPopupTemplate: 'app/components/header/search-bar/typeahead-popup.html',
            resultCountUpperLimit: 8,
            firstSelect: false,
            categories: []
        };

        let intObj = $interval(() => {
            if (angular.isDefined(appInfoService.appInfo) && angular.isDefined(appInfoService.appInfo.cats)) {
                $interval.cancel(intObj);
                if ($stateParams.cat1) {
                    vm.search.searchScope = appInfoService.getCat1($stateParams.cat1);
                    angular.noop();
                } else {
                    vm.search.searchScope = appInfoService.getCat1(0);
                }
                vm.search.categories = appInfoService.appInfo.cats.map(function (cat) {
                    return cat;
                });
                $timeout(() => {
                    vm._setWidthSearchBox();
                }, 50);
            }
        }, 100);

        $scope.$watch(() => {
            
            return vm.search.searchScope;
        }, () => {
            $timeout(() => {
                vm._setWidthSearchBox();
            }, 50);
        });

        let stateChangeEvt = $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                
                if (toState.name === 'home') {
                    vm.search.searchScope = appInfoService.getCat1(0);
                    $timeout(() => {
                        vm._setWidthSearchBox();
                    }, 50);
                } else if (toState.name === 'searchResults') {
                    $timeout(() => {
                        vm.search.searchScope = appInfoService.getCat1(toParams.cat1);
                    });
                }
                
            });

        /* On Refresh string should be retained*/
        if (!$state.is("home")) {
            $timeout(() => {
                //vm.search.searchString = SearchBarService.srchStr;
                if ($stateParams.cat1)
                    vm.search.searchScope = appInfoService.getCat1($stateParams.cat1);
                else
                    vm.search.searchScope = appInfoService.getCat1(0);
            }, 100);

            if (SearchBarService.srchStr) {
                vm.search.searchString = SearchBarService.srchStr;
            }
        }
        /* On Back button click string should be retained*/
        $rootScope.$on("backButtonSetSearchString", function () {
            vm.search.searchString = SearchBarService.srchStr;
            
        });



        $timeout(() => {
            vm._setWidthSearchBox();
        }, 100);

        angular.element($window).bind('resize', () => {
            vm._setWidthSearchBox();
        });

        vm.isCp = $stateParams.cp ? true : false;
    }

    textTyped(searchString) {
        let vm = this;
        let { $log, $rootScope, $scope, $location, dataServices, SearchBarService, appInfoService, $timeout } = vm.DI();
        //root$scope.searchString = searchString;
        SearchBarService.srchTempStr = searchString;

        if ($location.path() == '/search') {
        } else {
            SearchBarService.srchStr = searchString;
        }
        //SearchBarService.srchStr = searchString;
        SearchBarService.typeId = 2;
        $scope.$emit("showLoading", true);
        return dataServices.autoSearch(searchString, vm.search.searchScope.id, vm.search.searchScope).then(function (response) {
            vm.totalResults = response.totalResults;
            //vm.displayViewAll = response.displayViewAll;
            vm.resultSetLimit = response.resultSetLimit;
            response.totalResults === 1 ? vm.search.firstSelect = true : vm.search.firstSelect = false;

            let resultSet = [];
            angular.forEach(response.partSuggestList, (part) => {
                if (part.suggestType === "CAT_SUGGEST") {
                    part.typeId = 2;
                    if (vm.search.searchScope.id === appInfoService.getYMMCatId()) {
                        part.isYMMCat = true;
                    }
                    else if (part.suggestId == appInfoService.getYMMCatId()) {
                        part.isYMMCat = true;
                    }
                    else {
                        part.isYMMCat = false;
                    }
                    resultSet.push(part);
                }
            });

            /*vm.resultSet = resultSet;*/
            //let resultSet = response.parts,
            let firstExact = true,
                firstClose = true,
                firstSuggest = true;

            if (response.displayViewAll) {
                let obj = {
                    suggestString: "<a>View all " + response.totalResults + " matches</a>",
                    typeId: 3
                };
                resultSet.push(obj);
            }

            vm.parts = {
                count: 0,
                id: ''
            };
            angular.forEach(response.partSuggestList, (part) => {

                if (part.suggestType === "PART_SUGGEST") {
                    part.typeId = 4;
                    resultSet.push(part);
                    vm.parts.count++;
                    vm.parts.id = part.suggestId;
                    vm.parts.intChgPartNumber = part.intChgPartNumber;
                    vm.parts.competitiorPart = part.competitiorPart;
                }
            });
            angular.forEach(response.partSuggestList, (part) => {
                if (part.suggestType === "YMM_SUGGEST") {
                    part.typeId = 5;
                    resultSet.push(part);
                }
            });

            angular.forEach(resultSet, function (part) {
                if (part.typeId === 1 && firstExact) {
                    part.firstExact = true;
                    firstExact = false;
                } else if (part.typeId === 4 && firstClose) {
                    part.firstClose = true;
                    firstClose = false;
                } else if (part.typeId === 2 && firstSuggest) {
                    part.firstSuggest = true;
                    firstSuggest = false;
                }
            });

            $timeout(() => {
                vm._hideStrongInSuggestions();
            }, 100);

            $scope.$emit("showLoading", false);
            return resultSet.map(function (part) {
                return part;
            });

        }, function (error) {
            $scope.$emit("showLoading", false);
        });
    }

    focus() {
        let vm = this;
        let { $log, $scope } = vm.DI();
        $scope.$emit("searchbarFocussed");
    }

    blur() {
        let vm = this;

        let { $log, $scope, SearchBarService } = vm.DI();
        $scope.$emit("searchbarBlurred");
    }

    scopeSelectorChanged() {
        
        let vm = this;
        let { $document, $timeout } = vm.DI();
        let sBox = $document[0].getElementById('search-box');
        var ngModel = angular.element(sBox).controller('ngModel');
        ngModel.$setViewValue("");
        angular.element(sBox).triggerHandler('input');
        //vm.textTyped(vm.search.searchString);
        $timeout(function () {
            vm._setWidthSearchBox();
        });
        //vm.searchIconClick();
    }

    gotoPartDetails(item) {
        let vm = this;
        let {$log, $location, $rootScope, $timeout, SearchBarService, BreadCrumbService, appInfoService, $scope, $state, $stateParams} = vm.DI();
        //vm.search.searchScope = appInfoService.getCat1(item.suggestId);
        SearchBarService.categoryfilters = [];
        SearchBarService.filters = [];
        SearchBarService.selectdeFilters = [];
        SearchBarService.listPreviousFilter = [];
        SearchBarService.productLine = vm.search.searchScope;
        SearchBarService.sort = null;
        //debugger;
        if (item.typeId === 2) {
            SearchBarService.typeId = item.typeId;
            SearchBarService.srchStr = SearchBarService.srchTempStr;
            vm.search.searchString = SearchBarService.srchStr;
            /*item.lineDesc = "";
            item.partNumber = item.partNumber.replace(" in", "");*/
            $rootScope.$emit("clearCategoryFilter");
            SearchBarService.productLine = vm.search.searchScope;
            SearchBarService.autoSuggestItem = item;
            let catLevel = 0;
            if (SearchBarService.productLine.id === 0) {
                SearchBarService.productLine = appInfoService.getCat1(item.suggestId);
                SearchBarService.productCategory = 0;
                SearchBarService.productClass = 0;

            } else {
                catLevel = 2;
                SearchBarService.productClass = 0;
                SearchBarService.productCategory = appInfoService.getCat3(SearchBarService.productLine.id, null, item.suggestId);
            }

            $timeout(() => {
                $rootScope.$broadcast("categoryFilterApplied", { "id": item.suggestId, "suggestion": true, "catFilter": false, level: catLevel });
                SearchBarService.productLine = vm.search.searchScope;
                if (SearchBarService.productLine.id === 0) {
                    $rootScope.$emit('showAll', true);
                }
                else {
                    $rootScope.$emit('showAll', false);
                }
            }, 100);

            vm._blurSrchBox();
            $rootScope.$emit("showOnlyTreeInBC", false);
            BreadCrumbService.searchToResults = true;

            if ($state.is("searchResults")) {
                $scope.$emit("searchbarBlurred");
                // $scope.$emit("searchLaunched");
                let paramObj = { "str": SearchBarService.srchStr, 'filters': "", "from": "", "size": "", 'filterObject': "", "cat1": SearchBarService.productLine ? SearchBarService.productLine.id : "", "cat3": SearchBarService.productCategory ? SearchBarService.productCategory.id : "", "cat2": "", 'y': '', 'mk': '', 'md': '', "sort": '', "ics": '' };
                if(SearchBarService.srchStr===$stateParams.str){
                    $state.go("searchResults", paramObj, { reload: true });
                }else
                    $state.go("searchResults", paramObj);
            } else {
                //$location.path('/search');
                let paramObj = { "str": SearchBarService.srchStr, 'filters': "", "from": "", "size": "", 'filterObject': "", "cat1": SearchBarService.productLine ? SearchBarService.productLine.id : "", "cat3": SearchBarService.productCategory ? SearchBarService.productCategory.id : "", "cat2": "", 'y': '', 'mk': '', 'md': '', "sort": '', "ics": '' };
                $state.go("searchResults", paramObj);
            }
        } else if (item.typeId === 3) {
            SearchBarService.srchStr = SearchBarService.srchTempStr;
            vm.search.searchString = SearchBarService.srchStr;
            $rootScope.$emit('showAll', false);
            vm.searchIconClick();
        }
        else if (item.typeId === 5) {
            SearchBarService.srchStr = SearchBarService.srchTempStr;
            vm.search.searchString = item.suggestId;
            /*item.lineDesc = "";
            item.partNumber = item.partNumber.replace(" in", "");*/
            $rootScope.$emit("clearCategoryFilter");
            //SearchBarService.productLine = vm.search.searchScope;
            SearchBarService.autoSuggestItem = item;
            $timeout(() => {
                $rootScope.$broadcast("categoryFilterApplied", { "name": vm.search.searchScope, "suggestion": true, "catFilter": false });
                SearchBarService.productLine = vm.search.searchScope;
            });

            vm._blurSrchBox();

            if ($location.url() === '/search') {
                $scope.$emit("searchbarBlurred");
                //$scope.$emit("searchLaunched");
                let paramObj = { "str": SearchBarService.srchStr, 'filters': "", "from": "", "size": "", 'filterObject': "", "cat1": SearchBarService.productLine ? SearchBarService.productLine.id : "", "cat2": SearchBarService.productCategory ? SearchBarService.productCategory.id : "", "cat3": "", 'y': '', 'mk': '', 'md': '', "sort": '', "ics": '' };
                $state.go("searchResults", paramObj);
            } else {
                $location.path('/search');
            }
        }
        else {
            vm.search.searchString = vm.search.searchString.suggestString;
            let icIndex = vm.search.searchString.indexOf("<inter-desc>");
            if (icIndex !== -1) {
                vm.search.searchString = vm.search.searchString.substring(0, icIndex);
            }
            let icIndex2 = vm.search.searchString.indexOf("</interchange>");
            if (icIndex2 !== -1) {
                vm.search.searchString = vm.search.searchString.substring(0, icIndex2);
            }
            let icIndex3 = vm.search.searchString.indexOf("<interchange>");
            if (icIndex3 !== -1) {
                vm.search.searchString = vm.search.searchString.substring(0, icIndex3);
            }
            let ymmIndex = vm.search.searchString.indexOf("<ymm>");
            if (ymmIndex !== -1) {
                vm.search.searchString = vm.search.searchString.substring(0, ymmIndex);
            }
            BreadCrumbService.searchToResults = false;
            let paramObj = {
                type: "id",
                id: item.suggestId,
                ic: item.intChgPartNumber,
                cp: item.competitiorPart ? 1 : 0
            }
            $state.go('part', paramObj);
            vm._blurSrchBox();
        }
    }

    _hideStrongInSuggestions() {
        let vm = this;
        let {$document} = vm.DI();
        let suggestions = $document[0].getElementsByClassName("suggestions");
        let atags = angular.element(suggestions[0]).children("");
        angular.noop();
    }

    searchIconClick() {
        let vm = this;
        let {$log, $location, $timeout, $rootScope, SearchBarService, BreadCrumbService, $scope, $state} = vm.DI();

        vm._blurSrchBox();
        SearchBarService.autoSuggestItem = null;
        BreadCrumbService.searchToResults = true;
        BreadCrumbService.showOnlyTree = false;
        SearchBarService.categoryfilters = [];
        SearchBarService.filters = [];
        SearchBarService.selectdeFilters = [];
        SearchBarService.sort = null;
        $scope.$emit("searchbarBlurred");
        $rootScope.$emit("clearCategories");
        SearchBarService.productCategory = 0;
        SearchBarService.productClass = 0;
        SearchBarService.srchStr = ((SearchBarService.srchStr === "undefined")||(SearchBarService.srchStr === undefined))?"":SearchBarService.srchStr;
        if (vm.search.searchString) {
            if (vm.parts && vm.parts.count === 1 && !vm.parts.intChgPartNumber && !vm.parts.competitiorPart) {
                BreadCrumbService.searchToResults = false;
                let paramObj = {
                    type: "id",
                    id: vm.parts.id,
                    cp: vm.parts.competitiorPart ? 1 : 0
                }
                //$location.path('/part/id/' + item.suggestId);
                $state.go('part', paramObj);
                $location.path('/part/id/' + vm.parts.id);
            } else {
                if (vm.search.searchString) {
                    SearchBarService.productLine = vm.search.searchScope;

                    //$scope.$emit("searchLaunched");
                    $scope.$emit("searchbarBlurred");
                    let paramObj = { "str": SearchBarService.srchStr, 'filters': "", 'filterObject': "", "from": "", "size": "", "cat1": SearchBarService.productLine ? SearchBarService.productLine.id : "", "cat2": SearchBarService.productCategory ? SearchBarService.productCategory.id : "", "cat3": "", 'y': '', 'mk': '', 'md': '', "sort": '', "ics": '' };
                    if (SearchBarService.productLine.id === 0) {
                        $rootScope.$emit('showAll', true);
                    }
                    else {
                        $rootScope.$emit('showAll', false);
                    }
                    $timeout(() => {
                        $state.go("searchResults", paramObj);
                    });
                    /*if ($state.is("searchResults")) {
                        $scope.$emit("searchLaunched");
                        $scope.$emit("searchbarBlurred");
                    } else {
                        $location.path('/search');
                    }*/

                } else {
                    angular.noop();
                }
            }
        } else {
            SearchBarService.productLine = vm.search.searchScope;
            if (vm.search.searchScope.id == 0) {
                $state.go('home');
            } else {

                if ($state.is("searchResults")) {
                    let paramObj = { "str": SearchBarService.srchStr, 'filters': "", "from": "", "size": "", 'filterObject': "", "cat1": SearchBarService.productLine ? SearchBarService.productLine.id : "", "cat2": SearchBarService.productCategory ? SearchBarService.productCategory.id : "", "cat3": "", 'y': '', 'mk': '', 'md': '', "sort": '', "ics": '' };
                    $state.go("searchResults", paramObj);
                } else {
                    let paramObj = { "str": SearchBarService.srchStr, 'filters': "", "from": "", "size": "", 'filterObject': "", "cat1": SearchBarService.productLine ? SearchBarService.productLine.id : "", "cat2": SearchBarService.productCategory ? SearchBarService.productCategory.id : "", "cat3": "", 'y': '', 'mk': '', 'md': '', "sort": '', "ics": '' };
                    $state.go("searchResults", paramObj);
                }
                if (SearchBarService.productLine.id === 0) {
                    $rootScope.$emit('showAll', true);
                }
                else {
                    $rootScope.$emit('showAll', false);
                }
            }
        }
    }

    scopeSelClicked() {
        let vm = this;
        let { $scope } = vm.DI();
        $scope.$emit("searchbarFocussed");
    }


    _blurSrchBox() {
        let vm = this;
        let { $document, $log, $timeout, SearchBarService } = vm.DI();
        SearchBarService.srchStr = vm.search.searchString;
        $timeout(function () {
            var tb = $document[0].getElementById("search-box");
            tb.blur();
        }, 100);
    }

    _setWidthSearchBox() {
        let vm = this;
        let { $document, $log, $window, $rootScope } = vm.DI();
        let sBox = $document[0].getElementById('search-box');
        let catDd = $document[0].getElementById('category-dd');
        let sBar = ($document[0].getElementsByClassName('search-bar'))[0];
        let lens = $document[0].getElementById('lens-button');
        let newSBoxWidth = sBar.clientWidth - (catDd.clientWidth + 43);
        angular.element(sBox).css("width", newSBoxWidth + "px");
        let typPopup = ($document[0].getElementsByClassName('typeahead-popup'))[0];
        angular.element(typPopup).css("width", (sBox.clientWidth + 3) + "px");
        let typPopupLeft = $window.innerWidth < 1440 ? 163 : 163 + ($window.innerWidth - 1440) / 2;
        angular.element(typPopup).css("left", typPopupLeft + "px");
        $rootScope.$emit("realignMegaMenu");
    }

    clear() {
        let vm = this;
        vm.search.searchString = null;
    }


}
