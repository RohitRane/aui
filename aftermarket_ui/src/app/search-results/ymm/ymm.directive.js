export

    function ymmDirective() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/ymm/ymm.html',
        scope: {
            list: '=',
            category: '=',
            selectedItemsChanged: '&',
            ymmSearch: '&',
            isHeader: '@'

        },
        controller: YMMDirectiveController,
        controllerAs: 'vm',
        bindToController: true,

        link(scope, el, attr) {

        },

        compile(tElement, tAttrs, transclude) {
            return function ($scope, tElement) {
                $scope.directiveContent = false;
            };
        }
    };
    return directive;
}

class YMMDirectiveController {
    constructor($log, SearchBarService, dataServices, $scope, $rootScope, $state, $http, $q, $timeout, $document, $stateParams, YmmService, appInfoService) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({
            $log,
            SearchBarService,
            dataServices,
            YmmService,
            appInfoService,
            $scope,
            $rootScope,
            $stateParams,
            $http,
            $q,
            $state,
            $timeout
        });

        vm.isHeader = angular.fromJson(vm.isHeader);
        vm.ymmLabels = {
            'MAKE': 'Make',
            'MODEL': 'Model',
            'YEAR': 'Year'
        };

        $scope.yearList = "";
        $scope.makeList = "";
        $scope.modelList = "";
        $scope.directiveContent = false;

        $scope.showYMM = true;
        $scope.initDirective = false;
        $scope.headerLabelArray = [];


        $scope.yearSelected = false;
        $scope.makeSelected = false;
        $scope.ymmSubmit = false;
        $scope.ymmSubmitted = false;

        $scope.ymmPlaced = false;
        vm.ymmYear = 'Year';
        vm.ymmModel = "Model";
        vm.ymmMake = "Make";

        $scope.totRows = 14;


        $scope.ymmParent = 'Year';
        $scope.ymmFirstChild = "Make";
        $scope.ymmSecondChild = "Model";
        $scope.currentYMMOrder = []; //['YEAR', 'MAKE', 'MODEL'];

        $scope.ymmParentData = [];
        $scope.ymmFirstChildData = [];
        $scope.ymmSecondChildData = [];

        $scope.catChanged = false;

        vm.flickEven = false;
        for (let i = 1; i < 4; i++) {
            $timeout(() => {
                vm.flickEven = !vm.flickEven;
            }, 1000 * i);
        }



        let launchYMMList = $rootScope.$on("launchYMMList", () => {
            let ymmElem = $document[0].getElementsByClassName("ymm-directive");
            if (ymmElem[0]) {
                //    vm.initializeYMM();
                $scope.catChanged = true;
                $scope.ymmParentData = [];
            }

        });

        let resetYmm = $rootScope.$on("$resetYMM", () => {
            vm._resetYmm();
        });

        $rootScope.$on("$destroy", () => {
            launchYMMList();
            resetYmm();
        });


        $scope.$on("eventForYMM", function (evt, cat) {
            //Call for API config to know about parent

            /*YmmService.getAPIConfigDataForYMM()
             .then(function(response) {
             let {
             $scope
             } = vm.DI();

             let ymmConfig = response.data.APIResponse.ymmConfig;
             $scope.currentYMMOrder = ymmConfig;
             $scope.ymmParent = ymmConfig[0];
             $scope.ymmFirstChild = ymmConfig[1];
             $scope.ymmSecondChild = ymmConfig[2];


             }, function(error) {

             });

             vm.currentCategory = cat.prodCategory;
             vm.displayYMM(evt, cat);*/

            if (YmmService.yearList.length !== 0) {
                vm.yearList = YmmService.yearList;
            }

            if (YmmService.makeList.length !== 0) {
                vm.makeList = YmmService.makeList;
            }

            if (YmmService.modelList.length !== 0) {
                vm.modelList = YmmService.modelList;
            }
        });

        //starts shaifali code
        vm.yearArr = [{
            "decadeName": "1890s",
            "decadeYears": ['1896', '1897', '1898', '1899']
        }, {
                "decadeName": "1900s",
                "decadeYears": ['1900', '1901', '1902', '1903', '1904', '1905', '1906', '1907', '1908', '1909']
            }, {
                "decadeName": "1920s",
                "decadeYears": ['1920', '1921', '1922', '1923', '1924', '1925', '1926', '1927', '1928', '1929']
            }, {
                "decadeName": "1930s",
                "decadeYears": ['1930', '1931', '1932', '1933', '1934', '1935', '1936', '1937', '1938', '1939']
            }, {
                "decadeName": "1940s",
                "decadeYears": ['1940', '1941', '1942', '1943', '1944', '1945', '1946', '1947', '1948', '1949']
            }, {
                "decadeName": "1950s",
                "decadeYears": ['1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959']
            }, {
                "decadeName": "1960s",
                "decadeYears": ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969']
            }, {
                "decadeName": "1970s",
                "decadeYears": ['1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979']
            }, {
                "decadeName": "1980s",
                "decadeYears": ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989']
            }, {
                "decadeName": "1990s",
                "decadeYears": ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999']
            }, {
                "decadeName": "2000s",
                "decadeYears": ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009']
            }, {
                "decadeName": "2010s",
                "decadeYears": ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']
            }];
        //ends shaifali code

        /*if ($stateParams.y && $stateParams.mk && $stateParams.md) {
            setTimeout(() => {
                let nxtLvl = $scope.currentYMMOrder[0];
                YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                    .then((resp) => {
                        let optArr = [];
                        YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                            .then((resp) => {
                                optArr = resp.data.APIResponse.lvl1_list.map((itm) => {
                                    return itm.name;
                                });
                                switch (nxtLvl) {
                                    case 'YEAR': vm.yearList = optArr; break;
                                    case 'MAKE': vm.makeList = optArr; break;
                                    case 'MODEL': vm.modelList = optArr; break;
                                }

                            }, (error) => {

                            });
                    }, (error) => {

                    });
                setTimeout(() => {
                    let lvl = $scope.currentYMMOrder[0], nxtLvl = $scope.currentYMMOrder[1];
                    switch (lvl) {
                        case 'YEAR': YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y); break;
                        case 'MAKE': YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk); break;
                        case 'MODEL': YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md); break;
                    }
                    let optArr = [];
                    YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                        .then((resp) => {
                            optArr = resp.data.APIResponse.lvl2_list.map((itm) => {
                                return itm.name;
                            });
                            switch (nxtLvl) {
                                case 'YEAR': vm.yearList = optArr; break;
                                case 'MAKE': vm.makeList = optArr; break;
                                case 'MODEL': vm.modelList = optArr; break;
                            }

                        }, (error) => {

                        });
                    setTimeout(() => {
                        let lvl = $scope.currentYMMOrder[1], nxtLvl = $scope.currentYMMOrder[2];
                        switch (lvl) {
                            case 'YEAR': YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y); break;
                            case 'MAKE': YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk); break;
                            case 'MODEL': YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md); break;
                        }
                        //YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                        let optArr = [];
                        YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                            .then((resp) => {
                                optArr = resp.data.APIResponse.lvl3_list.map((itm) => {
                                    return itm.name;
                                });
                                switch (nxtLvl) {
                                    case 'YEAR': vm.yearList = optArr; break;
                                    case 'MAKE': vm.makeList = optArr; break;
                                    case 'MODEL': vm.modelList = optArr; break;
                                }

                            }, (error) => {

                            });
                    }, 300);
                }, 300);
            });

        }*/

    }

    getLbl(lbl) {
        let vm = this;
        return vm.ymmLabels[lbl];
    }

    initializeYMM() {
        let vm = this;
        let {
            $scope, YmmService
        } = vm.DI();
        $scope.catChanged = true;
        let ymmConfig = "";
        if (YmmService.YMMOrder.length > 0) {
            $scope.currentYMMOrder = YmmService.YMMOrder;
            $scope.ymmParent = ymmConfig[0];
            $scope.ymmFirstChild = ymmConfig[1];
            $scope.ymmSecondChild = ymmConfig[2];
        } else {
            YmmService.getAPIConfigDataForYMM()
                .then(function (response) {
                    let {
                        $scope
                    } = vm.DI();

                    ymmConfig = response.data.APIResponse.ymmConfig;
                    $scope.currentYMMOrder = ymmConfig;
                    $scope.ymmParent = ymmConfig[0];
                    $scope.ymmFirstChild = ymmConfig[1];
                    $scope.ymmSecondChild = ymmConfig[2];
                    YmmService.YMMOrder = ymmConfig;
                }, function (error) {

                });
        }
        $scope.ymmSubmitted = false;
        //vm.currentCategory = cat.prodCategory;
        vm.displayYMM({}, {});
    }

    checkInited(evt, cxt) {
        let vm = this;
        let {
            $log,
            $scope
        } = vm.DI();
        $scope.initDirective = true;
    }

    resetTable() {
        let vm = this;
        let {
            $log,
            $scope
        } = vm.DI();

        vm.headerLabelArray = [];

        var tableElement = angular.element(document.querySelector('#yearSelectorTable'));

        Array.prototype.forEach.call(tableElement.children(), function (el) {

            Array.prototype.forEach.call(el.children, function (innerEl) {

                if (innerEl.textContent.indexOf('s') == -1) {
                    if (innerEl.nodeType == 1 && innerEl.children.length == 0 && innerEl.nodeName == 'LI') {
                        //var yrContent = Number(innerEl.textContent);
                        var yrContent = innerEl.textContent;
                        var a = document.createElement('a');
                        var linkText = document.createTextNode(innerEl.textContent);
                        a.appendChild(linkText);
                        a.title = "my title text";
                        a.name = innerEl.textContent;
                        a.href = "#";
                        innerEl.innerHTML = "";
                        innerEl.appendChild(a);
                        innerEl.setAttribute('style', 'color:red;font-weight:600');

                    }
                }

                //Checking for currScope.yearList against first
                if (innerEl.textContent.indexOf('s') !== -1) {
                    var prefixCheck = innerEl.textContent.substring(0, 3);
                    var self = this;

                    vm.yearList.forEach(function (year) {
                        var stringYr = year + "";
                        innerEl.setAttribute('style', 'color:#b0b0b0;font-weight:600');
                    }, self)
                }
            }, vm)
        }, vm);

        var yearHolder = angular.element(document.querySelector('#yearHolder'));
        if (vm.isHeader)
            yearHolder.css('top', '195px');
        else
            yearHolder.css('top', '230px');

    }

    showYearTable($event, e) {
        let vm = this;
        let {
            $log,
            $scope
        } = vm.DI();

        if ($event.target.nodeName == "A") {
            $scope.ymmYear = $event.target.firstChild.data;
            YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $event.target.firstChild.data);
        }

        vm.headerLabelArray = [];

        var tableElement = angular.element(document.querySelector('#yearSelectorTable'));
        if ($scope.catChanged == true) {
            vm.resetTable();
            $scope.catChanged = false;
        }
        Array.prototype.forEach.call(tableElement.children(), function (el) {
            Array.prototype.forEach.call(el.children, function (innerEl) {
                if (innerEl.textContent.indexOf('s') == -1) {
                    if (innerEl.nodeType == 1) {
                        //var yrContent = Number(innerEl.textContent);
                        var yrContent = innerEl.textContent;
                        if (vm.yearList.indexOf(yrContent) == -1) {
                            var hrefContent = innerEl.textContent;
                            while (innerEl.firstChild) {
                                innerEl.removeChild(innerEl.firstChild);
                            }
                            var textnode = document.createTextNode(hrefContent); // Create a text node
                            innerEl.appendChild(textnode);
                            innerEl.setAttribute('style', 'color:#b0b0b0;font-weight:600');
                        }
                    }
                }

                //Checking for currScope.yearList against first
                if (innerEl.textContent.indexOf('s') !== -1) {
                    var prefixCheck = innerEl.textContent.substring(0, 3);
                    var self = this;
                    vm.yearList.forEach(function (year) {
                        var stringYr = year;
                        //checking years with each header Labels, if not matched making grey
                        if (stringYr.substring(0, 3) !== prefixCheck && self.headerLabelArray.indexOf(prefixCheck) == -1) {
                            innerEl.setAttribute('style', 'color:#b0b0b0;font-weight:600');
                            // self.headerLabelArray.push(prefixCheck);

                        } else {
                            //checking years with each header Labels, if matched not make grey
                            self.headerLabelArray.push(prefixCheck);
                            innerEl.setAttribute('style', 'color:black;font-weight:600');
                        }
                    }, self)
                }
            }, vm)
        }, vm);

        var yearHolder = angular.element(document.querySelector('#yearHolder'));

        if (vm.isHeader)
            yearHolder.css('top', '195px');
        else
            yearHolder.css('top', '230px');
    }


    //Display the directive
    displayYMM($event, e) {
        // if(e.initDirective==true)return;
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            $q,
            $state,
            $stateParams,
            YmmService,
            SearchBarService,
            appInfoService
        } = vm.DI();

        //yearData(q,cats,year,make,model,from,size)
        vm.ymmYear = $scope.ymmYear;

        let ymmConfig = $scope.currentYMMOrder;
        $scope.ymmParent = ymmConfig[0];
        $scope.ymmFirstChild = ymmConfig[1];
        $scope.ymmSecondChild = ymmConfig[2];

        $scope.ymmParentData = [];
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.then(

            function () {

                let currParent, currChild1, currChild2;
                if ($scope) {
                    $scope.ymmParent ? currParent = $scope.ymmParent.charAt(0).toUpperCase() + $scope.ymmParent.slice(1).toLowerCase() : angular.noop();
                    $scope.ymmFirstChild ? currChild1 = $scope.ymmFirstChild.charAt(0).toUpperCase() + $scope.ymmFirstChild.slice(1).toLowerCase() : angular.noop();
                    $scope.ymmSecondChild ? currChild2 = $scope.ymmSecondChild.charAt(0).toUpperCase() + $scope.ymmSecondChild.slice(1).toLowerCase() : angular.noop();
                }

                if (currParent == 'Year') {
                    vm.yearList = $scope.ymmParentData;
                } else if (currParent == 'Make') {
                    vm.makeList = $scope.ymmParentData;
                } else {
                    vm.modelList = $scope.ymmParentData;
                }

                let yearPlaceHolder = document.querySelector(".yearSelector"),
                    makePlaceholder = document.querySelector(".makeSelector"),
                    modelPlaceholder = document.querySelector(".modelSelector");

                if (vm.yearList !== undefined || vm.makeList !== undefined || vm.modelList !== undefined) {

                    var directiveSelector = angular.element(document.querySelector(".ymm-directive"));
                    directiveSelector.css('height', '50px');
                    vm.initDirective = true;

                    var currLevelSelector = angular.element(document.querySelector('#ymm' + currParent + 'Selector'));
                    currLevelSelector.removeClass('disabled');
                    currLevelSelector.attr('disabled', false);
                    if (($stateParams.y && $stateParams.mk && $stateParams.md) || vm.enable3DD) {
                        var secondLevelSelector = angular.element(document.querySelector('#ymm' + currChild1 + 'Selector'));
                        var thirdLevelSelector = angular.element(document.querySelector('#ymm' + currChild2 + 'Selector'));
                        secondLevelSelector.removeClass('disabled');
                        secondLevelSelector.attr('disabled', false);
                        thirdLevelSelector.removeClass('disabled');
                        thirdLevelSelector.attr('disabled', false);
                    } else if (vm.enable2DD) {
                        var secondLevelSelector = angular.element(document.querySelector('#ymm' + currChild1 + 'Selector'));
                        secondLevelSelector.removeClass('disabled');
                        secondLevelSelector.attr('disabled', false);
                    }

                    $scope.catChanged = true;

                    if (!vm.ymmYear)
                        vm.ymmYear = 'Year';
                    if (!vm.ymmModel)
                        vm.ymmModel = "Model";
                    if (!vm.ymmMake)
                        vm.ymmMake = "Make";
                } else {
                    vm.initDirective = false;
                    $scope.catChanged = false;
                    var directiveSelector = angular.element(document.querySelector(".ymm-directive"));
                    directiveSelector.css('height', '0px');
                }

                if (SearchBarService.ymmFilter) {
                    vm.ymmYear = SearchBarService.ymmFilter.year;
                    vm.ymmMake = SearchBarService.ymmFilter.make;
                    vm.ymmModel = SearchBarService.ymmFilter.model;
                }

                if (!$scope.ymmPlaced && $scope.currentYMMOrder[0] !== "YEAR") {

                    let container = yearPlaceHolder.parentNode;
                    let oldParentItem = container.childNodes[1];

                    (currParent == "Make") ? yearPlaceHolder.parentNode.insertBefore(makePlaceholder, oldParentItem) :
                        ((currParent == "Model") ? yearPlaceHolder.parentNode.insertBefore(modelPlaceholder, oldParentItem) : console.log('year is the default parent'));

                    let oldFirstChildItem = yearPlaceHolder.parentNode.childNodes[2];
                    if (currChild1 == "Year") {
                        yearPlaceHolder.parentNode.insertBefore(yearPlaceholder, oldParentItem);
                    } else if (currChild1 == "Make") {
                        yearPlaceHolder.parentNode.insertBefore(makePlaceholder, oldParentItem);
                    } else {
                        yearPlaceHolder.parentNode.insertBefore(modelPlaceholder, oldParentItem);
                    }
                    $scope.ymmPlaced = true;
                } else {
                    $scope.ymmPlaced = true;
                }
            }
        )

        if ($scope.ymmParentData.length > 0) {
            deferred.resolve();
        } else {
            YmmService.emptyLevelData();
            let setIntvl = setInterval(() => {
                if (appInfoService.appInfo) {
                    clearInterval(setIntvl);
                    YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, vm.isHeader).then(
                        function (result) {
                            let {
                                $scope
                            } = vm.DI();
                            $scope.$emit("showLoading", result.data.APIResponse.refreshSearch);

                            vm.enable2DD = true;
                            vm.enable3DD = true;
                            $scope.ymmParentData = result.data.APIResponse.lvl1_list.map((itm) => {
                                if (itm.selected) {
                                    let lvl = $scope.currentYMMOrder[0];
                                    switch (lvl) {
                                        case 'YEAR':
                                            vm.ymmYear = itm.name;
                                            $scope.ymmYear = itm.name;
                                            updatel1('y', itm);
                                            break;
                                        case 'MAKE':
                                            vm.ymmMake = itm.name;
                                            $scope.ymmMake = itm.name;
                                            updatel1('mk', itm);
                                            break;
                                        case 'MODEL':
                                            vm.ymmModel = itm.name;
                                            $scope.ymmModel = itm.name;
                                            updatel1('md', itm);
                                            break;
                                    }

                                    function updatel1(l1, itm) {
                                        let paramObj = {};
                                        paramObj[l1] = itm.name;
                                        if (result.data.APIResponse.responseQ || result.data.APIResponse.responseQ === "") {
                                            paramObj["str"] = result.data.APIResponse.responseQ;
                                            SearchBarService.srchStr = result.data.APIResponse.responseQ;
                                            $scope.$emit("checkSearch", SearchBarService.srchStr);
                                        }
                                        paramObj = angular.merge($stateParams, paramObj);
                                        $state.go("searchResults", paramObj, {
                                            notify: false,
                                            location: 'replace'
                                        });
                                    }

                                }
                                return itm.name;
                            });
                            if (result.data.APIResponse.lvl2_list.length) {
                                let lvl = $scope.currentYMMOrder[1],
                                    selectName;
                                let list2 = result.data.APIResponse.lvl2_list.map((itm) => {
                                    if (itm.selected) {
                                        selectName = itm.name;
                                        switch (lvl) {
                                            case 'YEAR':
                                                vm.ymmYear = selectName;
                                                $scope.ymmYear = selectName;
                                                updatel2('y', itm);
                                                break;
                                            case 'MAKE':
                                                vm.ymmMake = selectName;
                                                $scope.ymmMake = selectName;
                                                updatel2('mk', itm);
                                                break;
                                            case 'MODEL':
                                                vm.ymmModel = selectName;
                                                $scope.ymmModel = selectName;
                                                updatel2('md', itm);
                                                break;
                                        }
                                    }
                                    return itm.name;
                                });
                                switch (lvl) {
                                    case 'YEAR':
                                        vm.yearList = list2;
                                        YmmService.yearList = list2;
                                        break;
                                    case 'MAKE':
                                        vm.makeList = list2;
                                        YmmService.makeList = list2;
                                        break;
                                    case 'MODEL':
                                        vm.modelList = list2;
                                        YmmService.modelList = list2;
                                        break;
                                }

                                function updatel2(l2, itm) {
                                    let paramObj = {};
                                    paramObj[l2] = itm.name;
                                    if (result.data.APIResponse.responseQ) {
                                        paramObj["str"] = result.data.APIResponse.responseQ;
                                        SearchBarService.srchStr = result.data.APIResponse.responseQ;
                                        $scope.$emit("checkSearch", SearchBarService.srchStr);
                                    }
                                    paramObj = angular.merge($stateParams, paramObj);
                                    $state.go("searchResults", paramObj, {
                                        notify: false,
                                        location: 'replace'
                                    });
                                }
                            } else {
                                vm.enable2DD = false;
                            }
                            if (result.data.APIResponse.lvl3_list.length) {
                                let lvl = $scope.currentYMMOrder[2],
                                    selectName;
                                let list3 = result.data.APIResponse.lvl3_list.map((itm) => {
                                    if (itm.selected) {
                                        selectName = itm.name;
                                        switch (lvl) {
                                            case 'YEAR':
                                                vm.ymmYear = selectName;
                                                $scope.ymmYear = selectName;
                                                updatel3('y', itm);
                                                break;
                                            case 'MAKE':
                                                vm.ymmMake = selectName;
                                                $scope.ymmMake = selectName;
                                                updatel3('mk', itm);
                                                break;
                                            case 'MODEL':
                                                vm.ymmModel = selectName;
                                                $scope.ymmModel = selectName;
                                                updatel3('md', itm);
                                                break;
                                        }
                                    }
                                    return itm.name;
                                });
                                switch (lvl) {
                                    case 'YEAR':
                                        vm.yearList = list3;
                                        YmmService.yearList = list3;
                                        break;
                                    case 'MAKE':
                                        vm.makeList = list3;
                                        YmmService.makeList = list3;
                                        break;
                                    case 'MODEL':
                                        vm.modelList = list3;
                                        YmmService.modelList = list3;
                                        break;
                                }
                                function updatel3(l3, itm) {
                                    let paramObj = {};
                                    paramObj[l3] = itm.name;
                                    if (result.data.APIResponse.responseQ) {
                                        paramObj["str"] = result.data.APIResponse.responseQ;
                                        SearchBarService.srchStr = result.data.APIResponse.responseQ;
                                        $scope.$emit("checkSearch", SearchBarService.srchStr);
                                    }

                                    paramObj = angular.merge($stateParams, paramObj);
                                    if (result.data.APIResponse.refreshSearch) {
                                        $state.go("searchResults", paramObj, {
                                            notify: true,
                                            location: 'replace'
                                        });
                                    } else
                                        $state.go("searchResults", paramObj, {
                                            notify: false,
                                            location: 'replace'
                                        });
                                }
                            } else {
                                vm.enable3DD = false;
                            }
                            deferred.resolve(result);
                        },
                        function (error) {
                            // handle errors here
                        });
                    if (vm.isHeader) {
                        vm._resetYmm();
                    }

                    /*if ($stateParams.y && $stateParams.mk && $stateParams.md) {
                        if (YmmService.yearList.length !== 0 && YmmService.makeList.length !== 0 && YmmService.modelList.length !== 0) {
                            if (YmmService.yearList.length !== 0) {
                                vm.yearList = YmmService.yearList;
                            }
                            if (YmmService.makeList.length !== 0) {
                                vm.makeList = YmmService.makeList;
                            }

                            if (YmmService.modelList.length !== 0) {
                                vm.modelList = YmmService.modelList;
                            }
                        } else {
                            let intvl = setInterval(() => {
                                if ($scope.currentYMMOrder.length) {
                                    clearInterval(intvl);
                                    let lvl = $scope.currentYMMOrder[0],
                                        nxtLvl = $scope.currentYMMOrder[1];
                                    switch (lvl) {
                                        case 'YEAR':
                                            YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                            break;
                                        case 'MAKE':
                                            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk);
                                            break;
                                        case 'MODEL':
                                            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md);
                                            break;
                                    }
                                    let optArr = [];
                                    YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                                        .then((resp) => {
                                            optArr = resp.data.APIResponse.lvl2_list.map((itm) => {
                                                return itm.name;
                                            });
                                            switch (nxtLvl) {
                                                case 'YEAR':
                                                    vm.yearList = optArr;
                                                    break;
                                                case 'MAKE':
                                                    vm.makeList = optArr;
                                                    break;
                                                case 'MODEL':
                                                    vm.modelList = optArr;
                                                    break;
                                            }

                                        }, (error) => {

                                        });
                                    let intvl2 = setInterval(() => {
                                        if ($scope.currentYMMOrder.length) {
                                            clearInterval(intvl2);
                                            let prvLvl = $scope.currentYMMOrder[0],
                                                lvl = $scope.currentYMMOrder[1],
                                                nxtLvl = $scope.currentYMMOrder[2];
                                            switch (prvLvl) {
                                                case 'YEAR':
                                                    YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                                    break;
                                                case 'MAKE':
                                                    YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk);
                                                    break;
                                                case 'MODEL':
                                                    YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md);
                                                    break;
                                            }
                                            switch (lvl) {
                                                case 'YEAR':
                                                    YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                                    break;
                                                case 'MAKE':
                                                    YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk);
                                                    break;
                                                case 'MODEL':
                                                    YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md);
                                                    break;
                                            }
                                            //YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                            let optArr = [];
                                            YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                                                .then((resp) => {
                                                    optArr = resp.data.APIResponse.lvl3_list.map((itm) => {
                                                        return itm.name;
                                                    });
                                                    switch (nxtLvl) {
                                                        case 'YEAR':
                                                            vm.yearList = optArr;
                                                            break;
                                                        case 'MAKE':
                                                            vm.makeList = optArr;
                                                            break;
                                                        case 'MODEL':
                                                            vm.modelList = optArr;
                                                            break;
                                                    }

                                                }, (error) => {

                                                });
                                        }
                                    }, 300);
                                }
                            }, 300);
                        }

                    }*/


                    /*.............three time ymm call........*/
                    if ($stateParams.y && $stateParams.mk && $stateParams.md) {
                        let intvl = setInterval(() => {
                            if ($scope.currentYMMOrder.length) {
                                clearInterval(intvl);
                                let lvl = $scope.currentYMMOrder[0],
                                    nxtLvl = $scope.currentYMMOrder[1];
                                switch (lvl) {
                                case 'YEAR':
                                    YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                    break;
                                case 'MAKE':
                                    YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk);
                                    break;
                                case 'MODEL':
                                    YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md);
                                    break;
                                }
                                let optArr = [];
                                YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                                    .then((resp) => {
                                        optArr = resp.data.APIResponse.lvl2_list.map((itm) => {
                                            return itm.name;
                                        });
                                        switch (nxtLvl) {
                                        case 'YEAR':
                                            vm.yearList = optArr;
                                            break;
                                        case 'MAKE':
                                            vm.makeList = optArr;
                                            break;
                                        case 'MODEL':
                                            vm.modelList = optArr;
                                            break;
                                        }

                                    }, (error) => {

                                    });
                                let intvl2 = setInterval(() => {
                                    if ($scope.currentYMMOrder.length) {
                                        clearInterval(intvl2);
                                        let prvLvl = $scope.currentYMMOrder[0],
                                            lvl = $scope.currentYMMOrder[1],
                                            nxtLvl = $scope.currentYMMOrder[2];
                                        switch (prvLvl) {
                                        case 'YEAR':
                                            YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                            break;
                                        case 'MAKE':
                                            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk);
                                            break;
                                        case 'MODEL':
                                            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md);
                                            break;
                                        }
                                        switch (lvl) {
                                        case 'YEAR':
                                            YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                            break;
                                        case 'MAKE':
                                            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk);
                                            break;
                                        case 'MODEL':
                                            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md);
                                            break;
                                        }
                                        //YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                        let optArr = [];
                                        YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                                            .then((resp) => {
                                                optArr = resp.data.APIResponse.lvl3_list.map((itm) => {
                                                    return itm.name;
                                                });
                                                switch (nxtLvl) {
                                                case 'YEAR':
                                                    vm.yearList = optArr;
                                                    break;
                                                case 'MAKE':
                                                    vm.makeList = optArr;
                                                    break;
                                                case 'MODEL':
                                                    vm.modelList = optArr;
                                                    break;
                                                }

                                            }, (error) => {

                                            });
                                    }
                                }, 300);
                            }
                        }, 300);

                    }
                }
            }, 100);

        }

    }

    _generateL2L3() {
        let vm = this;
        let {
            $scope, $stateParams
        } = vm.DI();
        let intvl = setInterval(() => {
            if ($scope.currentYMMOrder.length) {
                clearInterval(intvl);
                let lvl = $scope.currentYMMOrder[0],
                    nxtLvl = $scope.currentYMMOrder[1];
                switch (lvl) {
                    case 'YEAR':
                        YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                        break;
                    case 'MAKE':
                        YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk);
                        break;
                    case 'MODEL':
                        YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md);
                        break;
                }
                let optArr = [];
                YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                    .then((resp) => {
                        optArr = resp.data.APIResponse.lvl2_list.map((itm) => {
                            return itm.name;
                        });
                        switch (nxtLvl) {
                            case 'YEAR':
                                vm.yearList = optArr;
                                break;
                            case 'MAKE':
                                vm.makeList = optArr;
                                break;
                            case 'MODEL':
                                vm.modelList = optArr;
                                break;
                        }

                    }, (error) => {

                    });
                let intvl2 = setInterval(() => {
                    if ($scope.currentYMMOrder.length) {
                        clearInterval(intvl2);
                        let prvLvl = $scope.currentYMMOrder[0],
                            lvl = $scope.currentYMMOrder[1],
                            nxtLvl = $scope.currentYMMOrder[2];
                        switch (prvLvl) {
                            case 'YEAR':
                                YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                break;
                            case 'MAKE':
                                YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk);
                                break;
                            case 'MODEL':
                                YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md);
                                break;
                        }
                        switch (lvl) {
                            case 'YEAR':
                                YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                                break;
                            case 'MAKE':
                                YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $stateParams.mk);
                                break;
                            case 'MODEL':
                                YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $stateParams.md);
                                break;
                        }
                        //YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $stateParams.y);
                        let optArr = [];
                        YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null, false)
                            .then((resp) => {
                                optArr = resp.data.APIResponse.lvl3_list.map((itm) => {
                                    return itm.name;
                                });
                                switch (nxtLvl) {
                                    case 'YEAR':
                                        vm.yearList = optArr;
                                        break;
                                    case 'MAKE':
                                        vm.makeList = optArr;
                                        break;
                                    case 'MODEL':
                                        vm.modelList = optArr;
                                        break;
                                }

                            }, (error) => {

                            });
                    }
                }, 300);
            }
        }, 300);
    }

    //click handler for year and populate Make
    yearHandler($event, e) {
        //  if($event.target.attributes[0].nodeName !=="href") return;
        if ($event && ($event.target.id == "yearSelectorTable" || $event.target.nodeName !== "A")) return;
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            YmmService,
            $q
        } = vm.DI();

        var populateDropDown = true;
        if ($event && $event.target.nodeName == "A") {
            vm.ymmYear = $event.target.firstChild.data;
            e.yearSelected = true;
            if ($scope.currentYMMOrder.indexOf('YEAR') == 0) {
                YmmService.emptyLevelData();
            } else if ($scope.currentYMMOrder.indexOf('YEAR') == 1) {
                YmmService.level[2] = null;
            } else {
                populateDropDown = false;
            }
            YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $event.target.firstChild.data);
        }


        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.then(function (result) {

            var nextLevelItem = "";
            if ($scope.ymmParent == "YEAR") {
                nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('YEAR') + 1];
            } else if ($scope.ymmFirstChild == "YEAR") {
                nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('YEAR') + 1];
            } else {
                nextLevelItem = null;
            }

            let nextParam = "";
            if ($scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('YEAR') + 1] !== undefined) {
                nextParam = $scope.currentYMMOrder.indexOf('YEAR') + 2;

                let nextItem = nextLevelItem.toLowerCase();
                //  vm+'.'+ nextItem + 'List' = result.data.APIResponse.lvl+nextParam +_list;
                var nextLevel = 'lvl' + nextParam + '_list';
                vm[nextItem + 'List'] = result.data.APIResponse["" + nextLevel].map((itm) => {
                    return itm.name;
                });
                vm.makeSelected = true;

                var nxtItem = nextItem.charAt(0).toUpperCase() + nextItem.slice(1).toLowerCase();
                var modelSelector = angular.element(document.querySelector('#ymm' + nxtItem + 'Selector'));
                modelSelector.removeClass('disabled');
            } else {
                vm.activateSubmit($event, e);
            }

            //Check whether submit button is enabled
            if ($scope.ymmSubmit == true || $scope.ymmSubmitted == false) {
                if (vm.getOrderbyYMM('YEAR') == 0) {
                    let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
                    let currElem = vm.getHTMLElement(lastElem.toLowerCase());
                    currElem.addClass('disabled');
                    vm.disableYMMSubmit();

                } else if (vm.getOrderbyYMM('YEAR') == 1) {
                    vm.disableYMMSubmit();
                } else {

                }
            }

        });


        if (populateDropDown) {
            YmmService.getYearData('SPL55', ["ALL", null, null], e.ymmYear, e.ymmMake, null, null, null, vm.isHeader).then(
                function (result) {
                    deferred.resolve(result);
                },
                function (error) {
                    // handle errors here
                })
        } else {
            deferred.resolve();
            populateDropDown = true;
        }


        if (vm.getOrderbyYMM('YEAR') == 0) {
            let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
            var nxtItem = lastElem.charAt(0).toUpperCase() + lastElem.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;

            let lastElem1 = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 2];
            var nxtItem = lastElem1.charAt(0).toUpperCase() + lastElem1.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;
            angular.noop();
        } else if (vm.getOrderbyYMM('YEAR') == 1) {
            let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
            var nxtItem = lastElem.charAt(0).toUpperCase() + lastElem.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;
        }
    }


    findMake($event, e) {
        // if($event.target.nodeName =="A"){
        let vm = this;
        let {

            $scope

        } = vm.DI();

        e.makeSelected = true;
        e.catChanged = true;
        var makeHolder = angular.element(document.querySelector('.makeClass'));
        if (vm.isHeader)
            makeHolder.css('top', '195px');
        else
            makeHolder.css('top', '230px');
        let reqdColumns = Math.ceil(e.vm.makeList.length / e.totRows);

        //  document.querySelector('#makeDropDown').style.columnCount = reqdColumns;
        // document.querySelector('#makeDropDown').style.WebkitColumnCount = reqdColumns;
        // document.querySelector('#makeDropDown').style.MozColumnCount = reqdColumns;
        // document.querySelector('#makeDropDown').style.columnCount = reqdColumns;

        if (e.vm.modelList !== undefined) {
            // let reqdColumns1 = Math.ceil(e.vm.makeList.length/e.totRows);
            // document.querySelector('#modelDropDown').style.columnCount = reqdColumns;
            // document.querySelector('#modelDropDown').style.WebkitColumnCount = reqdColumns1;
            // document.querySelector('#modelDropDown').style.MozColumnCount = reqdColumns1;
            // document.querySelector('#modelDropDown').style.columnCount = reqdColumns1;
        }

        $scope.makeQuery = "";

        if (vm.getOrderbyYMM('MAKE') == 0) {
            let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
            var nxtItem = lastElem.charAt(0).toUpperCase() + lastElem.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;

            let lastElem1 = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 2];
            var nxtItem = lastElem1.charAt(0).toUpperCase() + lastElem1.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;
        }

        var button = document.querySelector(".makeClass input");

        button.addEventListener("click", function (e) {
            e.stopPropagation();
        })
    }

    getOrderbyYMM(atr) {
        let vm = this;
        let {

            $scope

        } = vm.DI();

        return $scope.currentYMMOrder.indexOf(atr.toUpperCase());
    }

    //cllick handler for make and populate Model
    makeHandler($event, e) {
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            YmmService,
            $q
        } = vm.DI();

        var populateDropDown = true;

        if ($event.target.nodeName == "A") {
            vm.ymmMake = $event.target.firstChild.data;
            e.makeSelected = true;
            if ($scope.currentYMMOrder.indexOf('MAKE') == 0) {
                YmmService.emptyLevelData();
            } else if ($scope.currentYMMOrder.indexOf('MAKE') == 1) {
                YmmService.level[2] = null;
            } else {
                populateDropDown = false;
            }
            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $event.target.firstChild.data);
        }
        var deferred = $q.defer();
        var promise = deferred.promise;
        promise.then(function (result) {
            var nextLevelItem = "";
            if ($scope.ymmParent == "MAKE") {
                nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MAKE') + 1];
            } else if ($scope.ymmFirstChild == "MAKE") {
                nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MAKE') + 1];
            } else {
                nextLevelItem = null;
            }

            let nextParam = "";
            if ($scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MAKE') + 1] !== undefined) {
                nextParam = $scope.currentYMMOrder.indexOf('MAKE') + 2;

                let nextItem = nextLevelItem.toLowerCase();
                //  vm+'.'+ nextItem + 'List' = result.data.APIResponse.lvl+nextParam +_list;
                var nextLevel = 'lvl' + nextParam + '_list';
                vm[nextItem + 'List'] = result.data.APIResponse["" + nextLevel].map((itm) => {
                    return itm.name;
                });

                //for (var i in $scope.ymmParentData){$scope.ymmParentData[$scope.ymmParentData[i]]=[]}
                // $scope.ymmParentData[''+vm.ymmMake] = [].concat.apply([],result.data.APIResponse["" + nextLevel]);
                vm.makeSelected = true;

                var nxtItem = nextItem.charAt(0).toUpperCase() + nextItem.slice(1).toLowerCase();
                var modelSelector = angular.element(document.querySelector('#ymm' + nxtItem + 'Selector'));
                modelSelector.removeClass('disabled');
            } else {
                vm.activateSubmit($event, e);
            }

            //
            if ($scope.ymmSubmit == true || $scope.ymmSubmitted == false) {
                if (vm.getOrderbyYMM('MAKE') == 0) {
                    let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
                    let currElem = vm.getHTMLElement(lastElem.toLowerCase());
                    currElem.addClass('disabled');
                    vm.disableYMMSubmit();

                } else if (vm.getOrderbyYMM('MAKE') == 1) {
                    vm.disableYMMSubmit();
                } else {

                }
            }
        })


        if (populateDropDown) {
            YmmService.getYearData('SPL55', ["ALL", null, null], e.ymmYear, e.ymmMake, null, null, null, vm.isHeader).then(
                function (result) {
                    deferred.resolve(result);
                },
                function (error) {
                    // handle errors here
                })
        } else {
            deferred.resolve();
            populateDropDown = true;
        }
        if (vm.getOrderbyYMM('MAKE') == 0) {
            let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
            var nxtItem = lastElem.charAt(0).toUpperCase() + lastElem.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;

            let lastElem1 = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 2];
            var nxtItem = lastElem1.charAt(0).toUpperCase() + lastElem1.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;
            angular.noop();
        } else if (vm.getOrderbyYMM('MAKE') == 1) {
            let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
            var nxtItem = lastElem.charAt(0).toUpperCase() + lastElem.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;
        }
    }

    disableYMMSubmit() {
        let vm = this;
        let {
            $scope
        } = vm.DI();
        var submitSelector = angular.element(document.querySelector('#ymmSubmitSelector'));
        submitSelector.disabled = false;
        submitSelector.addClass('disabled');
        document.querySelector('#ymmSubmitSelector').style.color = "#6c6c6c";
        $scope.ymmSubmit = false;
    }

    getHTMLElement(nextItem) {
        var nxtItem = nextItem.charAt(0).toUpperCase() + nextItem.slice(1).toLowerCase();
        var modelSelector = angular.element(document.querySelector('#ymm' + nxtItem + 'Selector'));
        return modelSelector;
    }



    findModel($event, e) {
        // if($event.target.nodeName =="A"){
        let vm = this;
        let {
            $scope
        } = vm.DI();
        e.catChanged = true;
        var modelHolder = angular.element(document.querySelector('.modelClass'));
        if (vm.isHeader)
            modelHolder.css('top', '195px');
        else
            modelHolder.css('top', '230px');
        e.modelSelected = true;
        let reqdColumns = Math.ceil(e.vm.modelList.length / e.totRows);

        if (e.vm.makeList !== undefined) { }

        if (vm.getOrderbyYMM('MODEL') == 0) {
            let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
            var nxtItem = lastElem.charAt(0).toUpperCase() + lastElem.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;

            let lastElem1 = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 2];
            var nxtItem = lastElem1.charAt(0).toUpperCase() + lastElem1.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;
        }
        $scope.modelQuery = "";
        var button = document.querySelector(".modelClass input");

        button.addEventListener("click", function (e) {
            e.stopPropagation();
        })

    }

    toggleDisableYear($event, e) {
        return !e.yearSelected;
    }

    toggleDisableMake($event, e) {
        return !e.makeSelected;
    }

    toggleDisableModel($event, e) {
        return !e.makeSelected;
    }

    toggleYMMSubmit($event, e) {
        return !e.ymmSubmit;
    }

    modelHandler($event, e) {
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            $q,
            YmmService
        } = vm.DI();

        var populateDropDown = true;
        if ($event.target.nodeName == "A") {
            vm.ymmModel = $event.target.firstChild.data;
            e.modelSelected = true;
            if ($scope.currentYMMOrder.indexOf('MODEL') == 0) {
                YmmService.emptyLevelData();
            } else if ($scope.currentYMMOrder.indexOf('MODEL') == 1) {
                YmmService.level[2] = null;
            } else {
                populateDropDown = false;
            }
            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $event.target.firstChild.data);
        }

        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.then(function (result) {
            var nextLevelItem = "";
            if ($scope.ymmParent == "MODEL") {
                nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MODEL') + 1];
            } else if ($scope.ymmFirstChild == "MODEL") {
                nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MODEL') + 1];
            } else {
                nextLevelItem = null;
            }

            let nextParam = "";
            if ($scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MODEL') + 1] !== undefined) {
                nextParam = $scope.currentYMMOrder.indexOf('MODEL') + 2;

                let nextItem = nextLevelItem.toLowerCase();
                //  vm+'.'+ nextItem + 'List' = result.data.APIResponse.lvl+nextParam +_list;
                var nextLevel = 'lvl' + nextParam + '_list';
                vm[nextItem + 'List'] = result.data.APIResponse["" + nextLevel].map((itm) => {
                    return itm.name;
                });


                vm.modelSelected = true;
                var nxtItem = nextItem.charAt(0).toUpperCase() + nextItem.slice(1).toLowerCase();

                var modelSelector = angular.element(document.querySelector('#ymm' + nxtItem + 'Selector'));
                modelSelector.removeClass('disabled');
            } else {
                vm.activateSubmit($event, e);
            }

            if ($scope.ymmSubmit == true || $scope.ymmSubmitted == false) {
                if (vm.getOrderbyYMM('MODEL') == 0) {
                    let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
                    let currElem = vm.getHTMLElement(lastElem.toLowerCase());
                    currElem.addClass('disabled');
                    vm.disableYMMSubmit();

                } else if (vm.getOrderbyYMM('MODEL') == 1) {
                    vm.disableYMMSubmit();
                } else {

                }
            }

        })


        if (populateDropDown) {
            YmmService.getYearData('SPL55', ["ALL", null, null], e.ymmYear, e.ymmMake, null, null, null, vm.isHeader).then(
                function (result) {
                    deferred.resolve(result);
                },
                function (error) {
                    // handle errors here
                })
        } else {
            deferred.resolve();
            populateDropDown = true;
        }

        if (vm.getOrderbyYMM('MODEL') == 0) {
            let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
            var nxtItem = lastElem.charAt(0).toUpperCase() + lastElem.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;

            let lastElem1 = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 2];
            var nxtItem = lastElem1.charAt(0).toUpperCase() + lastElem1.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;
            angular.noop();
        } else if (vm.getOrderbyYMM('MODEL') == 1) {
            let lastElem = $scope.currentYMMOrder[$scope.currentYMMOrder.length - 1];
            var nxtItem = lastElem.charAt(0).toUpperCase() + lastElem.slice(1).toLowerCase();
            vm['ymm' + nxtItem] = nxtItem;
        }

    }

    activateSubmit($event, e) {
        let vm = this;
        let {
            $log,
            $http,
            $scope
        } = vm.DI();

        if ($event && $event.target.nodeName == "A") {
            // $scope.ymmModel = $event.target.firstChild.data;
        }


        e.ymmSubmit = true;
        $scope.ymmSubmit = true;
        var submitSelector = angular.element(document.querySelector('#ymmSubmitSelector'));
        submitSelector.disabled = false;
        submitSelector.removeClass('disabled');
        submitSelector.css('background-color', '#0093c6');
        submitSelector.css('color', '#FFFFFF');
    }

    searchByYMM($event, e) {
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            $state,
            $rootScope,
            $stateParams,
            dataServices,
            YmmService,
            SearchBarService,
            appInfoService
        } = vm.DI();

        $rootScope.$emit("ymmFiltersApplied", {
            "year": vm.ymmYear,
            "make": vm.ymmMake,
            "model": vm.ymmModel
        });

        YmmService.yearList = vm.yearList;
        YmmService.makeList = vm.makeList;
        YmmService.modelList = vm.modelList;

        let paramObj = {};
        if (vm.isHeader) {
            let cat1 = appInfoService.getYMMCatId();
            SearchBarService.srchStr = null;
            paramObj = {
                'cat1': cat1,
                'y': vm.ymmYear,
                'mk': vm.ymmMake,
                'md': vm.ymmModel,
                from: 0,
                'q': null
            };
        } else
            paramObj = angular.merge({}, $stateParams, {
                'y': vm.ymmYear,
                'mk': vm.ymmMake,
                'md': vm.ymmModel,
                from: 0
            });
        $state.go("searchResults", paramObj);
        /*vm.ymmSearch({
         selectedFilters: SearchBarService.selectdeFilters,
         ymm: {
         "year": vm.ymmYear,
         "make": vm.ymmMake,
         "model": vm.ymmModel
         }
         });*/

        //  YmmService.emptyLevelData();
        // vm.ymmMake = "Make";
        //vm.ymmYear ="Year";
        //vm.ymmModel="Model";
        $scope.catChanged = true;
        var submitSelector = angular.element(document.querySelector('#ymmSubmitSelector'));

        document.querySelector('#ymmSubmitSelector').style.color = "#6c6c6c";
        submitSelector.disabled = true;
        submitSelector.addClass('disabled');
        $scope.ymmSubmit = false;
        var firstItem = $scope.currentYMMOrder[0].toLowerCase();

        for (var i = 1; i < $scope.currentYMMOrder.length; i++) {
            var currItem = $scope.currentYMMOrder[i].toLowerCase();
            // vm[currItem + 'List'] = '';

            $scope[currItem + 'Selected'] = false;
            angular.element(document.querySelector('#ymm' + currItem.charAt(0).toUpperCase() + currItem.slice(1) + "Selector")).addClass('disabled');
            $scope.directiveContent = true;
        }
        $scope.ymmSubmitted = true;

    }

    textBoxClicked(e) {
        //e.preventDefault();
        e.stopPropagation();
    }


    _resetYmm() {
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            $state,
            $rootScope,
            $stateParams,
            dataServices,
            YmmService,
            SearchBarService,
            appInfoService
        } = vm.DI();
        vm.ymmYear = 'Year';
        vm.ymmModel = "Model";
        vm.ymmMake = "Make";
        let currChild1, currChild2;
        if ($scope) {
            $scope.ymmFirstChild ? currChild1 = $scope.ymmFirstChild.charAt(0).toUpperCase() + $scope.ymmFirstChild.slice(1).toLowerCase() : angular.noop();
            $scope.ymmSecondChild ? currChild2 = $scope.ymmSecondChild.charAt(0).toUpperCase() + $scope.ymmSecondChild.slice(1).toLowerCase() : angular.noop();
        }
        var secondLevelSelector = angular.element(document.querySelector('#ymm' + currChild1 + 'Selector'));
        var thirdLevelSelector = angular.element(document.querySelector('#ymm' + currChild2 + 'Selector'));
        secondLevelSelector.addClass("disabled");
        thirdLevelSelector.addClass("disabled");
        var submitYmmBtn = angular.element(document.querySelector('#ymmSubmitSelector'));
        submitYmmBtn.addClass("disabled");
    }

    //Controller ends here
}