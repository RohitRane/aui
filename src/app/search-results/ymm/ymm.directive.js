export function ymmDirective() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/ymm/ymm.html',
        scope: {
            list: '=',
            category: '=',
            selectedItemsChanged: '&',
            ymmSearch:'&'
            
        },
        controller: YMMDirectiveController,
        controllerAs: 'vm',
        bindToController: true,

        link: function(scope, el, attr) {
          console.log('am in ymm directive link function');
        },

        compile: function(tElement, tAttrs, transclude) {
            return function($scope, tElement) {
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

        $scope.selYear = 'Year';
        $scope.ymmModel = "Model";
        $scope.ymmMake = "Make";

        $scope.catChanged = false;


        $scope.$on("eventForYMM", function(evt, cat) {
            vm.currentCategory = cat.prodCategory;
            vm.displayYMM(evt, cat);
        });
    }

    checkInited(evt,cxt){
         let vm = this;
        let {
            $log,
            $scope
        } = vm.DI();
        $scope.initDirective=true;
    }

    resetTable(){
        let vm = this;
        let {
            $log,
            $scope
        } = vm.DI();

        vm.headerLabelArray = [];
        
        var tableElement = angular.element(document.querySelector('#yearSelectorTable'));
      
        Array.prototype.forEach.call(tableElement.children(), function(el) {
            Array.prototype.forEach.call(el.childNodes, function(innerEl) {
                if (innerEl.textContent.indexOf('s') == -1) {
                    if (innerEl.nodeType == 1 && innerEl.children.length==0 && innerEl.nodeName == 'LI') {
                        var yrContent = Number(innerEl.textContent);

                            var a = document.createElement('a');
                            var linkText = document.createTextNode(innerEl.textContent);
                            a.appendChild(linkText);
                            a.title = "my title text";
                            a.name = innerEl.textContent;
                            a.href = "#";
                            innerEl.innerHTML ="";
                            innerEl.appendChild(a);
                            innerEl.setAttribute('style', 'color:red;font-weight:600');
                        
                    }
                }

                //Checking for currScope.yearList against first 
                if (innerEl.textContent.indexOf('s') !== -1) {
                    var prefixCheck = innerEl.textContent.substring(0, 3);
                    var self = this;

                    vm.yearList.forEach(function(year) {
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

        vm.headerLabelArray = [];
        
        var tableElement = angular.element(document.querySelector('#yearSelectorTable'));
        if($scope.catChanged == true ){
            $scope.selYear = 'Year';
            $scope.ymmModel = "Model";
            $scope.ymmMake = "Make";
            vm.resetTable();
            $scope.catChanged = false;
        }
        Array.prototype.forEach.call(tableElement.children(), function(el) {
            Array.prototype.forEach.call(el.childNodes, function(innerEl) {
                if (innerEl.textContent.indexOf('s') == -1) {
                    if (innerEl.nodeType == 1) {
                        var yrContent = Number(innerEl.textContent);

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

                    vm.yearList.forEach(function(year) {
                        var stringYr = year + "";
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
        yearHolder.css('top', '195px');
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
        } = vm.DI();

        //yearData(q,cats,year,make,model,from,size)
        vm.selYear = $scope.selYear;
        YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null).then(
            function(result) {
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                let {$scope}= vm.DI();
                vm.yearList = result.data.APIResponse.yearList;
                $log.debug("YMM response :", vm.yearList);
                if (vm.yearList.length > 0) {
                    vm.initDirective = true;
                    var yearSelector = angular.element(document.querySelector('#ymmYearSelector'));
                    yearSelector.removeClass('disabled');
                    $scope.selYear = "Year";
                    $scope.catChanged = true;
                }
            },
            function(error) {
                // handle errors here
                console.log(error.statusText);
            });

    }

    //click handler for year and populate Make
    findYear($event, e) {
        if ($event.target.nodeName == "A") {
            e.selYear = $event.target.name;
        }

        let vm = this;
        let {
            $log,
            $http,
            $scope,
            YmmService
        } = vm.DI();


        //yearData(q,cats,year,make,model,from,size)
        YmmService.getYearData('SPL55', ["ALL", null, null], e.selYear, null, null, null, null).then(
            function(result) {
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                $log.debug("YMM response :", result);
                vm.makeList = result.data.APIResponse.makeList;
                e.yearSelected = true;
                var makeSelector = angular.element(document.querySelector('#ymmMakeSelector'));
                makeSelector.removeClass('disabled');
            },
            function(error) {
                // handle errors here
                console.log(error.statusText);
            })

    }


    findMake($event, e) {
        // if($event.target.nodeName =="A"){
        e.makeSelected = true;
        var makeHolder = angular.element(document.querySelector('#makeDropDown'));
        makeHolder.css('top', '200px');
        // }
    }

    //cllick handler for make and populate Model
    loadModel($event, e) {
        let vm = this;
        let {
            $log,
            $http,
            $scope,
            YmmService
        } = vm.DI();

        if ($event.target.nodeName == "A") {

            $scope.ymmMake = $event.target.firstChild.data;

        }

        YmmService.getYearData('SPL55', ["ALL", null, null], e.selYear, e.ymmMake, null, null, null).then(
            function(result) {
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                $log.debug("YMM response :", result);
                vm.modelList = result.data.APIResponse.modelList;
                vm.makeSelected = true;
                var modelSelector = angular.element(document.querySelector('#ymmModelSelector'));
                modelSelector.removeClass('disabled');
            },
            function(error) {
                // handle errors here
                console.log(error.statusText);
            })


    }

    findModel($event, e) {
        // if($event.target.nodeName =="A"){
        e.ymmSubmit = true;
        var modelHolder = angular.element(document.querySelector('#modelDropDown'));
        modelHolder.css('top', '200px');
        // }
    }

    toggleDisable($event, e) {
        return !e.yearSelected;
    }

    toggleDisableModel($event, e) {
        return !e.makeSelected;
    }

    toggleYMMSubmit($event, e) {
        return !e.ymmSubmit;
    }

    activateSubmit($event, e) {

        let vm = this;
        let {
            $log,
            $http,
            $scope
        } = vm.DI();

        if ($event.target.nodeName == "A") {
            $scope.ymmModel = $event.target.firstChild.data;
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
                SearchBarService
            } = vm.DI();
            
            $rootScope.$emit("ymmFiltersApplied",{"year":e.selYear, "make":e.ymmMake, "model":e.ymmModel});
            
            vm.ymmSearch({selectedFilters:SearchBarService.selectdeFilters, year:e.selYear, make:e.ymmMake, model:e.ymmModel});
            /*dataServices.ymmSearch(SearchBarService.srchStr, SearchBarService.productLine, SearchBarService.productCategory, e.selYear, e.ymmMake, e.ymmModel, 0, 10)
                .then(function(response) {

                    let {$scope}= vm.DI();
                    $scope.selYear="Year";
                    $scope.selMake="Make";
                    $scope.selModel="Model";

                }, function(error) {

                });*/
        }
        //Controller ends here
}