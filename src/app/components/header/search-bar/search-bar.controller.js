export class SearchBarController {

    constructor($log, $scope, $location, $rootScope, $document, $timeout, $window, $interval, $state, dataServices, SearchBarService, BreadCrumbService, appInfoService) {


        'ngInject';

        let vm = this;
        //Add all the DI this the vm model so that u can use them in the controller functions.


        vm.DI = () => ({ $log, $scope, $location, $rootScope, $document, $timeout, $window, $state, dataServices, BreadCrumbService, SearchBarService });


        let deregistrationCallback = $rootScope.$on("reachedhome", function () {
            vm.search.searchString = null;
        });
        $rootScope.$on('$destroy', deregistrationCallback);

        let applyHierarchyScope = $rootScope.$on("applyHierarchyScope", (evt, cat) => {
            console.log("hierarchy scope",cat);
            vm.search.searchScope = cat;
            $timeout(() => {
                vm._setWidthSearchBox();
            }, 50);
        });
        $rootScope.$on('$destroy', applyHierarchyScope);

        let deregistrationCallback2 = $rootScope.$on("categoryFilterApplied", function (evt, selectedCategory) {
            $log.debug("Cat Fill :", selectedCategory, vm.search.searchScope);
            if (vm.search.searchScope.id === 0) {
                vm.search.searchScope = selectedCategory;
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

        let intObj = $interval(() => {
            console.log("Hierarchy nav", appInfoService.appInfo);
            if (angular.isDefined(appInfoService.appInfo) && angular.isDefined(appInfoService.appInfo.cats)) {
                $interval.cancel(intObj);
                vm.search = {
                    searchScope: appInfoService.getCat1(0),
                    typeaheadTemplate: 'app/components/header/search-bar/typeahead.html',
                    typeaheadPopupTemplate: 'app/components/header/search-bar/typeahead-popup.html',
                    resultCountUpperLimit: 8,
                    firstSelect: false,
                    categories: []
                };
            }
        }, 100);


        let stateChangeEvt = $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                if (toState.name === 'home') {
                    vm.search.searchScope = appInfoService.getCat(0);
                    $timeout(() => {
                        vm._setWidthSearchBox();
                    }, 50);
                }
            });



        /* On Refresh string should be retained*/
        if (SearchBarService.srchStr && $location.path() != "/") {
            $timeout(() => {
                vm.search.searchString = SearchBarService.srchStr;
                vm.search.searchScope = SearchBarService.productLine;
            }, 100);

        }

        /* On Back button click string should be retained*/
        $rootScope.$on("backButtonSetSearchString", function () {
            console.log("Back in backButtonSetSearchString", SearchBarService.productLine);
            vm.search.searchString = SearchBarService.srchStr;
        });

        let intervalObj = $interval(() => {
            if (angular.isDefined(appInfoService.appInfo && appInfoService.appInfo.cats)) {
                $interval.cancel(intervalObj);
                vm.search.categories = appInfoService.appInfo.cats.map(function (cat) {
                    return cat;
                });
            }
        }, 200);


        $timeout(() => {
            vm._setWidthSearchBox();
        }, 100);

        angular.element($window).bind('resize', () => {
            vm._setWidthSearchBox();
        });

    }

    textTyped(searchString) {
        let vm = this;
        let { $log, $rootScope, $scope, $location, dataServices, SearchBarService } = vm.DI();
        //root$scope.searchString = searchString;
        SearchBarService.srchTempStr = searchString;
        if ($location.path() == '/search') {
        } else {
            SearchBarService.srchStr = searchString;
        }
        //SearchBarService.srchStr = searchString;
        SearchBarService.typeId = 2;
        $scope.$emit("showLoading", true);
        return dataServices.autoSearch(searchString, vm.search.searchScope.id).then(function (response) {
            $log.debug("abcd Response in Controller : ", response);
            vm.totalResults = response.totalResults;
            //vm.displayViewAll = response.displayViewAll;
            vm.resultSetLimit = response.resultSetLimit;
            response.totalResults === 1 ? vm.search.firstSelect = true : vm.search.firstSelect = false;

            let resultSet = [];
            angular.forEach(response.partSuggestList, (part) => {
                if (part.suggestType === "CAT_SUGGEST") {
                    $log.debug("CATEGORY >>>>>>>>", part);
                    part.typeId = 2;
                    resultSet.push(part);
                }
            });
            $log.debug("r set :", resultSet);

            /*vm.resultSet = resultSet;
            $log.debug("REsult SET :", vm.resultSet);*/
            //let resultSet = response.parts,
            let firstExact = true,
                firstClose = true,
                firstSuggest = true;

            if (response.displayViewAll) {
                $log.debug("in here...", resultSet);
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
                    $log.debug("PART >>>>>>>>", part);
                    part.typeId = 4;
                    resultSet.push(part);
                    vm.parts.count++;
                    vm.parts.id = part.suggestId;
                }
            });
            angular.forEach(response.partSuggestList, (part) => {
                if (part.suggestType === "YMM_SUGGEST") {
                    $log.debug("YMM >>>>>>>>", part);
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
                //$log.debug($rootScope.firstExactIndex + " " + vm.firstCloseIndex + " " + vm.firstSuggestIndex);
            });

            $log.debug("Result set :", resultSet);

            $scope.$emit("showLoading", false);
            return resultSet.map(function (part) {
                return part;
            });
        }, function (error) {
            $log.debug("Error in response :", error);
            $scope.$emit("showLoading", false);
        });
    }

    focus() {
        let vm = this;
        let { $log, $scope } = vm.DI();
        $log.debug("Focus.");
        $scope.$emit("searchbarFocussed");
    }

    blur() {
        let vm = this;

        let { $log, $scope, SearchBarService } = vm.DI();
        $log.debug("Blur.");
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

    }

    gotoPartDetails(item) {
        let vm = this;
        let {$log, $location, $rootScope, $timeout, SearchBarService, BreadCrumbService, $scope, $state} = vm.DI();

        $log.debug("Scope search :", vm.search.searchString);
        SearchBarService.categoryfilters = [];
        SearchBarService.filters = [];
        SearchBarService.selectdeFilters = [];
        SearchBarService.productLine = vm.search.searchScope;
        $log.debug("Item :", item);
        if (item.typeId === 2) {
            SearchBarService.typeId = item.typeId;
            SearchBarService.srchStr = SearchBarService.srchTempStr;
            vm.search.searchString = SearchBarService.srchStr;
            $log.debug("Srcchhhh :::", vm.search.searchString);
            /*item.lineDesc = "";
            item.partNumber = item.partNumber.replace(" in", "");*/
            $rootScope.$emit("clearCategoryFilter");
            SearchBarService.productLine = vm.search.searchScope;
            SearchBarService.autoSuggestItem = item;
            if (SearchBarService.productLine === "All") {
                SearchBarService.productLine = item.suggestId;
            } else SearchBarService.productCategory = item.suggestId;

            $timeout(() => {
                $rootScope.$broadcast("categoryFilterApplied", { "name": item.suggestId, "suggestion": true, "catFilter": false });
                SearchBarService.productLine = vm.search.searchScope;
            }, 100);

            vm._blurSrchBox();
            $log.debug("Inside search results :", $state.is("searchResults"));
            if ($state.is("searchResults")) {
                $scope.$emit("searchbarBlurred");
                $scope.$emit("searchLaunched");
            } else {
                $location.path('/search');
            }
        } else if (item.typeId === 3) {
            SearchBarService.srchStr = SearchBarService.srchTempStr;
            vm.search.searchString = SearchBarService.srchStr;
            vm.searchIconClick();
        }
        else if (item.typeId === 5) {
            SearchBarService.srchStr = SearchBarService.srchTempStr;
            vm.search.searchString = item.suggestId;
            $log.debug("YMM :::", vm.search.searchString);
            /*item.lineDesc = "";
            item.partNumber = item.partNumber.replace(" in", "");*/
            $rootScope.$emit("clearCategoryFilter");
            //SearchBarService.productLine = vm.search.searchScope;
            SearchBarService.autoSuggestItem = item;
            $timeout(() => {
                $rootScope.$broadcast("categoryFilterApplied", { "name": vm.search.searchScope, "suggestion": true, "catFilter": false });
                //SearchBarService.productLine = vm.search.searchScope;
            });

            vm._blurSrchBox();
            $log.debug("Inside search results :", $state.is("searchResults"));
            if ($location.url() === '/search') {
                $scope.$emit("searchbarBlurred");
                $scope.$emit("searchLaunched");
            } else {
                $location.path('/search');
            }
        }
        else {
            vm.search.searchString = vm.search.searchString.suggestString;
            let icIndex = vm.search.searchString.indexOf("<interchange>");
            if (icIndex !== -1) {
                vm.search.searchString = vm.search.searchString.substring(0, icIndex);
            }
            let ymmIndex = vm.search.searchString.indexOf("<ymm>");
            if (ymmIndex !== -1) {
                vm.search.searchString = vm.search.searchString.substring(0, ymmIndex);
            }
            BreadCrumbService.searchToResults = false;
            $location.path('/part/id/' + item.suggestId);
            vm._blurSrchBox();
        }
    }

    searchIconClick() {
        let vm = this;
        let {$log, $location, $rootScope, SearchBarService, BreadCrumbService, $scope, $state} = vm.DI();

        vm._blurSrchBox();
        SearchBarService.autoSuggestItem = null;
        BreadCrumbService.searchToResults = true;
        BreadCrumbService.showOnlyTree = false;
        SearchBarService.categoryfilters = [];
        SearchBarService.filters = [];
        SearchBarService.selectdeFilters = [];
        $scope.$emit("searchbarBlurred");
        $rootScope.$emit("clearCategories");
        SearchBarService.productCategory = 0;
        SearchBarService.productClass = 0;
        $log.debug("string....... :", vm.search.searchString);
        if (vm.search.searchString) {
            $log.debug("icon click Result set :", vm.resultSet);
            $log.debug("vm.search.searchString ", vm.search.searchString);
            if (vm.parts && vm.parts.count === 1) {
                $log.debug("Only one part");
                BreadCrumbService.searchToResults = false;
                $location.path('/part/id/' + vm.parts.id);
            } else {
                if (vm.search.searchString) {
                    $log.debug("Hello...........");
                    SearchBarService.productLine = vm.search.searchScope;
                    // $rootScope.$emit("searchIconClicked");
                    if ($state.is("searchResults")) {
                        $log.debug("url search ");
                        $scope.$emit("searchLaunched");
                        $scope.$emit("searchbarBlurred");
                    } else {
                        $location.path('/search');
                    }
                } else {
                    angular.noop();
                }
            }
        } else {
            if (vm.search.searchScope.id == 0) {
            } else {
                SearchBarService.productLine = vm.search.searchScope;
                $location.path('/search');
            }
        }
    }

    scopeSelClicked() {
        let vm = this;
        let { $scope } = vm.DI();
        //alert("Hi");
        $scope.$emit("searchbarFocussed");
    }


    _blurSrchBox() {
        let vm = this;
        let { $document, $log, $timeout, SearchBarService } = vm.DI();
        SearchBarService.srchStr = vm.search.searchString;
        $timeout(function () {
            console.log("blurring");
            var tb = $document[0].getElementById("search-box");
            tb.blur();
        }, 100);
    }

    _setWidthSearchBox() {
        let vm = this;
        let { $document, $log, $window } = vm.DI();
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
    }
}
