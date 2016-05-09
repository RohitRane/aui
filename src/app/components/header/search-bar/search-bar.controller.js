export class SearchBarController {

    constructor($log, $scope, $location, $rootScope, $document, $timeout, $window, dataServices, SearchBarService) {

        'ngInject';

        let vm = this;
        //Add all the DI this the vm model so that u can use them in the controller functions.

        vm.DI = () => ({ $log, $scope, $location, $rootScope, $document, $timeout, $window, dataServices, SearchBarService })

        let deregistrationCallback = $rootScope.$on("reachedhome", function () {
            vm.search.searchString = null;
        });
        $rootScope.$on('$destroy', deregistrationCallback);

        let deregistrationCallback2 = $rootScope.$on("categoryFilterApplied", function (evt, selectedCategory) {
            $log.debug("Cat Fill :", selectedCategory);
            if (vm.search.searchScope === 'All') {
                vm.search.searchScope = selectedCategory.name;
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
            searchScope: 'All',
            typeaheadTemplate: 'app/components/header/search-bar/typeahead.html',
            typeaheadPopupTemplate: 'app/components/header/search-bar/typeahead-popup.html',
            resultCountUpperLimit: 8,
            firstSelect: false,
            categories: [
                /*'Commercial Vehicle',
                'Automotive',
                'Off-Highway',
                'High Performance',
                'Military/Defense',
                'Industrial'*/
            ]
        };

        dataServices.appInfo().then(response => {
            $log.debug("APP INFO :", response);
            vm.search.categories = response.cats.map(function (cat) {
                return cat.name;
            });
        }, error => {

        });

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
        if ($location.path() == '/search') {
        } else {
            SearchBarService.srchStr = searchString;
        }
        // SearchBarService.srchStr = searchString;
        SearchBarService.typeId = 2;
        return dataServices.autoSearch(searchString, vm.search.searchScope).then(function (response) {
            $log.debug("abcd Response in Controller : ", response);
            vm.totalResults = response.totalResults;
            vm.resultSetLimit = response.resultSetLimit;
            response.totalResults === 1 ? vm.search.firstSelect = true : vm.search.firstSelect = false;

            let resultSet = response.parts,
                firstExact = true,
                firstClose = true,
                firstSuggest = true;
            resultSet = resultSet.map(function (part) {
                part.typeId = 2;
                return part;
            });
            if (response.totalResults > vm.resultSetLimit) {
                let obj = {
                    lineDesc: "View all " + response.totalResults + " matches",
                    typeId: 3
                };
                resultSet.push(obj);
            }

            angular.forEach(response.partCategoryList, function (listItem) {
                let obj = {
                    partNumber: searchString + " in ",
                    lineDesc: "<a>" + listItem + "</a>",
                    typeId: 4,
                    productCategory: listItem
                };
                resultSet.push(obj);
            });

            //let resultSet = response.parts.length > vm.search.resultCountUpperLimit ? response.parts.slice(0, vm.search.resultCountUpperLimit) : response.parts;
            angular.forEach(resultSet, function (part) {
                if (part.typeId === 1 && firstExact) {
                    part.firstExact = true;
                    firstExact = false;
                } else if (part.typeId === 2 && firstClose) {
                    part.firstClose = true;
                    firstClose = false;
                } else if (part.typeId === 4 && firstSuggest) {
                    part.firstSuggest = true;
                    firstSuggest = false;
                }
                $log.debug($rootScope.firstExactIndex + " " + vm.firstCloseIndex + " " + vm.firstSuggestIndex);
            })
            return resultSet.map(function (part) {
                return part;
            });
        }, function (error) {
            $log.debug("Error in response :", error);
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
        ngModel.$setViewValue("ABC");
        angular.element(sBox).triggerHandler('input');
        //vm.textTyped(vm.search.searchString);
        $timeout(function () {
            vm._setWidthSearchBox();
        });

    }

    gotoPartDetails(item) {
        let vm = this;
        let {$log, $location, $rootScope, SearchBarService, $scope} = vm.DI();

        SearchBarService.productLine = vm.search.searchScope;
        $log.debug("Item :", item);
        if (item.typeId === 4) {
            //SearchBarService.srchStr = item.lineDesc;
            SearchBarService.typeId = item.typeId;
            $log.debug("Srcchhhh :::", vm.search.searchString);
            /*item.lineDesc = item.lineDesc.replace("<a>", "");
            item.lineDesc = item.lineDesc.replace("</a>", "");*/
            item.lineDesc = "";
            item.partNumber = item.partNumber.replace(" in", "");
            //SearchBarService.productLine = item.lineDesc;
            SearchBarService.productLine = vm.search.searchScope;
            SearchBarService.productCategory = item.productCategory;
            if ($location.url() === '/search') {
                $scope.$emit("searchbarBlurred");
                $scope.$emit("searchLaunched");
            } else {
                $location.path('/search');
            }
        } else if (item.typeId === 3) {
            vm.search.searchString = SearchBarService.srchStr;
            vm.searchIconClick();
        }
        else {
            $location.path('/part/' + item.id);
            vm._blurSrchBox();
        }
    }

    searchIconClick() {
        let vm = this;
        let {$log, $location, $rootScope, SearchBarService, $scope} = vm.DI();
        vm._blurSrchBox();
        $scope.$emit("searchbarBlurred");
        $rootScope.$emit("clearCategories");
        SearchBarService.productCategory = "";
        if (vm.search.searchString) {
            $log.debug("vm.search.searchString ", vm.search.searchString);
            if (vm.search.searchString) {
                $log.debug("Hello...........");
                SearchBarService.productLine = vm.search.searchScope;
                // $rootScope.$emit("searchIconClicked");
                if ($location.url() === '/search') {
                    $log.debug("url search ");
                    $scope.$emit("searchLaunched");
                    $scope.$emit("searchbarBlurred");
                } else {
                    $location.path('/search');
                }
            } else {
                $log.debug("$emit");
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
