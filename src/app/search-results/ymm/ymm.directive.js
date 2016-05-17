export function ymmDirective() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/ymm/ymm.html',
        scope: {
            list: '=',
            category: '=',
            selectedItemsChanged: '&'
        },
        controller: YMMDirectiveController,
        controllerAs: 'vm',
        bindToController: true,

        link: function(scope, element, attributes) {
            var i, list = angular.element(element);
            element.on("click", function(el) {
                // debugger; 
            })
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

        $scope.showYMM = true;
        $scope.initDirective = false;
        $scope.headerLabelArray = [];

        $scope.selYear = 'Year';
        $scope.yearSelected = false;
        $scope.makeSelected = false;
        $scope.ymmSubmit = false;

        $scope.ymmModel = "Model";
        $scope.ymmMake = "Make";
    }


    showYearTable($event, e) {
        let vm = this;
        let {
            $log,
            $scope
        } = vm.DI();


        vm.headerLabelArray = [];
        var tableElement = angular.element(document.querySelector('#yearSelectorTable'));
        Array.prototype.forEach.call(tableElement.children(), function(el) {
            Array.prototype.forEach.call(el.childNodes, function(innerEl) {

                //
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

                ///Checking for currScope.yearList against first 

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
        YmmService.getYearData('SPL55', ["ALL", null, null], null, null, null, null, null).then(
            function(result) {
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                $log.debug("YMM response :", result);
                vm.yearList = result.data.APIResponse.yearList;
                if (vm.yearList.length > 0) {
                    vm.initDirective = true;
                    var yearSelector = angular.element(document.querySelector('#ymmYearSelector'));
                    yearSelector.removeClass('disabled');
                }

            },
            function(error) {
                // handle errors here
                console.log(error.statusText);
            })

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




        /*     $http({
                 url: "http://54.183.226.9:8080/search-service/api/ymmList",
                 method: 'POST',
                 data: {
                     "q": "SPL55",
                     "cats": ["ALL", null, null],
                     "year": e.selYear
                 }

             }).then(function(response) {
                 $log.debug("YMM response :", response);
                 vm.makeList = response.data.APIResponse.makeList;
                 e.yearSelected = true;
                  var makeSelector = angular.element(document.querySelector('#ymmMakeSelector'));
                  makeSelector.removeClass('disabled');

             }, function(error) {
                 //debugger;    
             });*/
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



        /*   $http({
                url: "http://54.183.226.9:8080/search-service/api/ymmList",
               method: 'POST',
               data: {
                   "q": "SPL55",
                   "cats": ["ALL", null, null],
                   "year": e.selYear,
                   "make": e.ymmMake

               }

           }).then(function(response) {
               $log.debug("YMM response :", response);
               vm.modelList = response.data.APIResponse.modelList;
               vm.makeSelected = true;
               var modelSelector = angular.element(document.querySelector('#ymmModelSelector'));
                modelSelector.removeClass('disabled');
           }, function(error) {
               //debugger;    
           });*/

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
                dataServices,
                SearchBarService
            } = vm.DI();
            dataServices.ymmSearch(SearchBarService.srchStr, SearchBarService.productLine, SearchBarService.productCategory, e.selYear, e.ymmMake, e.ymmModel, 0, 10)
                .then(function(response) {

                }, function(error) {

                });
            /*$http({
                url: "http://52.8.125.250:8080/search-service/api/ymmList",
                method: 'POST',
                data: {
                    "q": "SPL55",
                    "from": 0,
                    "size": 10,
                    "cats": ["ALL", null, null],
                    "year": e.selYear,
                    "make": e.ymmMake,
                    "model": e.ymmModel
                }

            }).then(function(response) {
                $log.debug("YMM response :", response);
                vm.modelList = response.data.APIResponse.modelList;
                vm.makeSelected = true;
            }, function(error) {
                //debugger;    
            });*/
        }
        //Controller ends here
}