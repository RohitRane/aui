export function ymmDirective() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/ymm/ymm.html',
        scope: {
            list: '=',
            category: '=',
            selectedItemsChanged: '&',
            ymmSearch: '&'

        },
        controller: YMMDirectiveController,
        controllerAs: 'vm',
        bindToController: true,

        link: function (scope, el, attr) {
            console.log('am in ymm directive link function');
        },

        compile: function (tElement, tAttrs, transclude) {
            return function ($scope, tElement) {
                $scope.directiveContent = true;
                console.log('inside compile function');
            };
        }
    };
    return directive;
}

class YMMDirectiveController {
    constructor($log, SearchBarService, dataServices, $scope, $rootScope, $http, YmmService) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({
            $log,
            SearchBarService,
            dataServices,
            YmmService,
            $scope,
            $rootScope,
            $http
        });

        $scope.yearList = "";
        $scope.makeList = "";
        $scope.modelList = "";
        $scope.directiveContent = "";

        $scope.showYMM = true;
        $scope.initDirective = false;
        $scope.headerLabelArray = [];


        $scope.yearSelected = false;
        $scope.makeSelected = false;
        $scope.ymmSubmit = false;

        vm.selYear = 'Year';
        vm.ymmModel = "Model";
        vm.ymmMake = "Make";


        $scope.ymmParent = 'Year';
        $scope.ymmFirstChild = "Make";
        $scope.ymmSecondChild = "Model";
        $scope.currentYMMOrder = ['YEAR', 'MAKE', 'MODEL'];

        $scope.catChanged = false;


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
        });
    }

    initializeYMM() {
        let vm = this;
        let {$scope,YmmService} = vm.DI();
        $scope.catChanged = true;


        YmmService.getAPIConfigDataForYMM()
            .then(function (response) {
                let {
                    $scope
                } = vm.DI();

                let ymmConfig = response.data.APIResponse.ymmConfig;
                $scope.currentYMMOrder = ymmConfig;
                $scope.ymmParent = ymmConfig[0];
                $scope.ymmFirstChild = ymmConfig[1];
                $scope.ymmSecondChild = ymmConfig[2];


            }, function (error) {

            });

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
            Array.prototype.forEach.call(el.childNodes, function (innerEl) {
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
        yearHolder.css('top', '195px');

    }

    showYearTable($event, e) {
        let vm = this;
        let {
            $log,
            $scope
        } = vm.DI();

        if ($event.target.nodeName == "A") {
            $scope.selYear = $event.target.firstChild.data;
            YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $event.target.firstChild.data);
        }

        vm.headerLabelArray = [];

        var tableElement = angular.element(document.querySelector('#yearSelectorTable'));
        if ($scope.catChanged == true) {

            vm.resetTable();
            $scope.catChanged = false;
        }
        Array.prototype.forEach.call(tableElement.children(), function (el) {
            Array.prototype.forEach.call(el.childNodes, function (innerEl) {
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
        yearHolder.css('top', '58%');
    }


    //Display the directive
    displayYMM($event, e) {
        // if(e.initDirective==true)return;
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            YmmService,
            SearchBarService
        } = vm.DI();

        //yearData(q,cats,year,make,model,from,size)
        vm.selYear = $scope.selYear;


   

        YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null).then(
            function (result) {
                let {
                    $scope
                } = vm.DI();

                let currParent = $scope.ymmParent.charAt(0).toUpperCase() + $scope.ymmParent.slice(1).toLowerCase(),
                currChild1 = $scope.ymmFirstChild.charAt(0).toUpperCase() + $scope.ymmFirstChild.slice(1).toLowerCase(),
                currChild2 = $scope.ymmSecondChild.charAt(0).toUpperCase() + $scope.ymmSecondChild.slice(1).toLowerCase();

                console.log('currParent this is the current parent',currParent);
                let yearPlaceHolder = document.querySelector(".yearSelector"),
                makePlaceholder = document.querySelector(".makeSelector"),
                modelPlaceholder = document.querySelector(".modelSelector");

                if (currParent == 'Year') {
                    vm.yearList = result.data.APIResponse.lvl1_list;
                    $log.debug("YMM response :", vm.yearList);
                }
                else if (currParent == 'Make') {
                    vm.makeList = result.data.APIResponse.lvl1_list;
                    $log.debug("YMM response :", vm.makeList);
                }
                else {
                    vm.modelList = result.data.APIResponse.lvl1_list;
                    $log.debug("YMM response :", vm.modelList);
                }

                console.log('currParent this is the current parent',currParent);

                let container = yearPlaceHolder.parentNode;
              


                let oldParentItem = container.childNodes[1];
               /* if (currParent == "Make") {
                    yearPlaceHolder.parentNode.insertBefore(makePlaceholder, oldParentItem);
                }
                else if (currParent == "Model") {
                    //container.append(modelPlaceholder);
                    yearPlaceHolder.parentNode.insertBefore(modelPlaceholder, oldParentItem);
                }
                else {
                    console.log('year is the default parent');
                }*/

                (currParent =="Make")?yearPlaceHolder.parentNode.insertBefore(makePlaceholder, oldParentItem):
                ((currParent=="Model")? yearPlaceHolder.parentNode.insertBefore(modelPlaceholder, oldParentItem):console.log('year is the default parent'));

                

                let oldFirstChildItem = yearPlaceHolder.parentNode.childNodes[2];
                if (currChild1 == "Year") {
                    yearPlaceHolder.parentNode.insertBefore(yearPlaceholder, oldParentItem);
                }
                else if (currChild1 == "Make") {
                    yearPlaceHolder.parentNode.insertBefore(makePlaceholder, oldParentItem);
                }
                else {
                    console.log('inside last ');
                    yearPlaceHolder.parentNode.insertBefore(modelPlaceholder, oldParentItem);
                }


                if (vm.yearList !== undefined || vm.makeList !== undefined || vm.modelList !== undefined) {

                    var directiveSelector = angular.element(document.querySelector(".ymm-directive"));
                    directiveSelector.css('height', '50px');
                    vm.initDirective = true;


                    var currLevelSelector = angular.element(document.querySelector('#ymm' + currParent + 'Selector'));
                    currLevelSelector.removeClass('disabled');
                    currLevelSelector.attr('disabled', false);
                    $scope.catChanged = true;

                    vm.selYear = 'Year';
                    vm.ymmModel = "Model";
                    vm.ymmMake = "Make";
                } else {
                    vm.initDirective = false;
                    $scope.catChanged = false;
                    var directiveSelector = angular.element(document.querySelector(".ymm-directive"));
                    directiveSelector.css('height', '0px');
                }

                if (SearchBarService.ymmFilter) {
                    vm.selYear = SearchBarService.ymmFilter.year;
                    vm.ymmMake = SearchBarService.ymmFilter.make;
                    vm.ymmModel = SearchBarService.ymmFilter.model;
                }
            },
            function (error) {
                // handle errors here
                console.log(error.statusText);
            });



    }

    //click handler for year and populate Make
    yearHandler($event, e) {
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            YmmService
        } = vm.DI();

        if ($event.target.nodeName == "A") {
            vm.selYear = $event.target.firstChild.data;
            e.yearSelected = true;
             if($scope.currentYMMOrder.indexOf('YEAR')==0){
                YmmService.emptyLevelData();
            }
            else if($scope.currentYMMOrder.indexOf('YEAR')==1){
                YmmService.level[2]=null;   
            }
            YmmService.setLevelData($scope.currentYMMOrder.indexOf('YEAR'), $event.target.firstChild.data);
        }
        YmmService.getYearData('SPL55', ["ALL", null, null], e.selYear, e.ymmMake, null, null, null).then(
            function (result) {
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                $log.debug("YMM response :", result);

                var nextLevelItem = "";
                if ($scope.ymmParent == "YEAR") {
                    nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('YEAR') + 1];
                }
                else if ($scope.ymmFirstChild == "YEAR") {
                    nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('YEAR') + 1];
                }
                else {
                    nextLevelItem = null;
                }

                let nextParam = "";
                if ($scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('YEAR') + 1] !== undefined) {
                    nextParam = $scope.currentYMMOrder.indexOf('YEAR') + 2;

                    let nextItem = nextLevelItem.toLowerCase();
                    //  vm+'.'+ nextItem + 'List' = result.data.APIResponse.lvl+nextParam +_list;
                    var nextLevel = 'lvl' + nextParam + '_list';
                    vm[nextItem + 'List'] = result.data.APIResponse["" + nextLevel];
                    vm.makeSelected = true;

                    var nxtItem = nextItem.charAt(0).toUpperCase() + nextItem.slice(1).toLowerCase();

                    var modelSelector = angular.element(document.querySelector('#ymm' + nxtItem + 'Selector'));
                    modelSelector.removeClass('disabled');
                }
                else {
                    vm.activateSubmit($event, e);
                }
            },
            function (error) {
                // handle errors here
                console.log(error.statusText);
            })

    }


    findMake($event, e) {
        // if($event.target.nodeName =="A"){
        e.makeSelected = true;
        var makeHolder = angular.element(document.querySelector('#makeDropDown'));
        makeHolder.css('top', '58%');
        // }
    }

    //cllick handler for make and populate Model
    makeHandler($event, e) {
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            YmmService
        } = vm.DI();

        if ($event.target.nodeName == "A") {
            vm.ymmMake = $event.target.firstChild.data;
            e.makeSelected = true;
             if($scope.currentYMMOrder.indexOf('MAKE')==0){
                YmmService.emptyLevelData();
            }
            else if($scope.currentYMMOrder.indexOf('MAKE')==1){
                YmmService.level[2]=null;   
            }
            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MAKE'), $event.target.firstChild.data);
        }

        YmmService.getYearData('SPL55', ["ALL", null, null], e.selYear, e.ymmMake, null, null, null).then(
            function (result) {
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                $log.debug("YMM response :", result);

                var nextLevelItem = "";
                if ($scope.ymmParent == "MAKE") {
                    nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MAKE') + 1];
                }
                else if ($scope.ymmFirstChild == "MAKE") {
                    nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MAKE') + 1];
                }
                else {
                    nextLevelItem = null;
                }

                let nextParam = "";
                if ($scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MAKE') + 1] !== undefined) {
                    nextParam = $scope.currentYMMOrder.indexOf('MAKE') + 2;

                    let nextItem = nextLevelItem.toLowerCase();
                    //  vm+'.'+ nextItem + 'List' = result.data.APIResponse.lvl+nextParam +_list;
                    var nextLevel = 'lvl' + nextParam + '_list';
                    vm[nextItem + 'List'] = result.data.APIResponse["" + nextLevel];
                    vm.makeSelected = true;

                    var nxtItem = nextItem.charAt(0).toUpperCase() + nextItem.slice(1).toLowerCase();

                    var modelSelector = angular.element(document.querySelector('#ymm' + nxtItem + 'Selector'));
                    modelSelector.removeClass('disabled');
                }
                else {
                    activateSubmit($event, e);
                }

            },
            function (error) {
                // handle errors here
                console.log(error.statusText);
            })
    }

    findModel($event, e) {
        // if($event.target.nodeName =="A"){
        e.ymmSubmit = true;
        var modelHolder = angular.element(document.querySelector('#modelDropDown'));
        modelHolder.css('top', '58%');
        // }
    }

    toggleDisable($event, e) {
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
            YmmService
        } = vm.DI();

        if ($event.target.nodeName == "A") {
            vm.ymmModel = $event.target.firstChild.data;
            e.modelSelected = true;
            if($scope.currentYMMOrder.indexOf('MODEL')==0){
                YmmService.emptyLevelData();
            }
            else if($scope.currentYMMOrder.indexOf('MODEL')==1){
                YmmService.level[2]=null;   
            }
            YmmService.setLevelData($scope.currentYMMOrder.indexOf('MODEL'), $event.target.firstChild.data);
        }

        YmmService.getYearData('SPL55', ["ALL", null, null], e.selYear, e.ymmMake, null, null, null).then(
            function (result) {
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                $log.debug("YMM response :", result);

                var nextLevelItem = "";
                if ($scope.ymmParent == "MODEL") {
                    nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MODEL') + 1];
                }
                else if ($scope.ymmFirstChild == "MODEL") {
                    nextLevelItem = $scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MODEL') + 1];
                }
                else {
                    nextLevelItem = null;
                }

                let nextParam = "";
                if ($scope.currentYMMOrder[$scope.currentYMMOrder.indexOf('MODEL') + 1] !== undefined) {
                    nextParam = $scope.currentYMMOrder.indexOf('MODEL') + 2;

                    let nextItem = nextLevelItem.toLowerCase();
                    //  vm+'.'+ nextItem + 'List' = result.data.APIResponse.lvl+nextParam +_list;
                    var nextLevel = 'lvl' + nextParam + '_list';
                    vm[nextItem + 'List'] = result.data.APIResponse["" + nextLevel];
                    vm.modelSelected = true;
                    var nxtItem = nextItem.charAt(0).toUpperCase() + nextItem.slice(1).toLowerCase();

                    var modelSelector = angular.element(document.querySelector('#ymm' + nxtItem + 'Selector'));
                    modelSelector.removeClass('disabled');
                }
                else {
                    activateSubmit($event, e);
                }

            },
            function (error) {
                // handle errors here
                console.log(error.statusText);
            });

    }

    activateSubmit($event, e) {
        let vm = this;
        let {
            $log,
            $http,
            $scope
        } = vm.DI();

        if ($event.target.nodeName == "A") {
            // $scope.ymmModel = $event.target.firstChild.data;
        }
        e.ymmSubmit = true;
        var submitSelector = angular.element(document.querySelector('#ymmSubmitSelector'));
        submitSelector.removeClass('disabled');
        submitSelector.css('background-color', '#0093c6');
    }

    searchByYMM($event, e) {
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            $rootScope,
            dataServices,
            YmmService,
            SearchBarService
        } = vm.DI();

        $rootScope.$emit("ymmFiltersApplied", {
            "year": vm.selYear,
            "make": vm.ymmMake,
            "model": vm.ymmModel
        });

        vm.ymmSearch({
            selectedFilters: SearchBarService.selectdeFilters,
            ymm: {
                "year": vm.selYear,
                "make": vm.ymmMake,
                "model": vm.ymmModel
            }
        });
      
      YmmService.emptyLevelData();
      $scope.catChanged = true;
      var submitSelector = angular.element(document.querySelector('#ymmSubmitSelector'));
        submitSelector.addClass('disabled');
      //  submitSelector.css('background-color', '#0093c6');

    }
    //Controller ends here
}