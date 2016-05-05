export class SearchBarController {
    constructor($log, $scope, $location, $rootScope, $document, $timeout, $window, dataServices, SearchBarService) {
        'ngInject';

        let vm = this;
        //Add all the DI this the vm model so that u can use them in the controller functions.
        vm.DI = () => ({ $log, $scope, $location, $rootScope, $document, $timeout, $window, dataServices, SearchBarService })
        vm.totalResults = "";
        vm.partNumber = "";
        vm.logger = $log;

        vm.search = {
            searchScope: 'Commercial Vehicle',
            typeaheadTemplate: 'app/components/header/search-bar/typeahead.html',
            typeaheadPopupTemplate: 'app/components/header/search-bar/typeahead-popup.html',
            resultCountUpperLimit: 8,
            firstSelect: false,
            categories: [
                'Commercial Vehicle',
                'Light Vehicle',
                'Off-Highway',
                'High Performance',
                'Military/Defence',
                'Industrial'
            ]
        };
        $timeout(() => {
            vm._setWidthSearchBox();
        }, 100);
        
        angular.element($window).bind('resize',()=>{
            $log.debug("Window reseized");
            vm._setWidthSearchBox();
        });

    }

    textTyped(searchString) {
        let vm = this;
        let { $log, $rootScope, $scope, dataServices, SearchBarService } = vm.DI();
        //root$scope.searchString = searchString;
        SearchBarService.srchStr = searchString;
        SearchBarService.typeId = 2;
        return dataServices.autoSearch(searchString, vm.search.searchScope).then(function (response) {
            $log.debug("Response in Controller : ", response);
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
                    lineDesc: "View " + response.totalResults + " matches",
                    typeId: 3
                };
                resultSet.push(obj);
            }

            angular.forEach(response.partCategoryList, function (listItem) {
                let obj = {
                    partNumber: SearchBarService.srchStr + " in ",
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
        let { $log, $scope } = vm.DI();
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
        let { $log, $location, $rootScope, SearchBarService, $scope } = vm.DI();
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
        } else {
            $location.path('/part/' + item.partNumber);
        }
    }

    searchIconClick() {
        let vm = this;
        let { $log, $location, $rootScope, SearchBarService, $scope } = vm.DI();
        $scope.$emit("searchbarBlurred");
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

    _setWidthSearchBox() {
        let vm = this;
        let { $document, $log } = vm.DI();
        let sBox = $document[0].getElementById('search-box');
        $log.debug("sbox width :", sBox.clientWidth);
        let catDd = $document[0].getElementById('category-dd');
        $log.debug("cat dd width :", catDd.clientWidth);
        let sBar = ($document[0].getElementsByClassName('search-bar'))[0];
        $log.debug("s bar width :", sBar.clientWidth);
        let lens = $document[0].getElementById('lens-button');
        $log.debug("lens width :", lens.offsetWidth);
        let newSBoxWidth = sBar.clientWidth - (catDd.clientWidth + 43);
        angular.element(sBox).css("width", newSBoxWidth + "px");
        $log.debug("sbox width after :", sBox.clientWidth);
        let totalWidth = sBox.clientWidth + catDd.clientWidth + lens.clientWidth;
        $log.debug("Total sbar width after :", totalWidth);

    }
}
