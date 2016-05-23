export function categoryMenuDirective() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/header/menus/categories/categories.html',
        /*scope: {
            //creationDate: '='
        },*/
        controller: CategoryMenuController,
        controllerAs: 'categoryMenu',
        bindToController: true,
        replace: true
        /*link: function(scope, elem, attr) {
        (start) code in future it will use
            elem.bind('click', function(e) {

                $document.on('click', function (e) {
                    if (elem !== e.target && !elem[0].contains(e.target)) {
                        scope.$apply(function () {
                            //scope.$eval(scope.showSubMenu);
                            scope.showSubMenu = !scope.showSubMenu;
                            return;
                        });
                    }
                });

                var currElem = elem.find('li');//.attr('src');
                if(scope.currentIndex !=="")
                {
                    currElem[scope.currentIndex].style.borderBottom ='none';
                    //angular.element(currElem[scope.currentIndex]).find('a').css('color','white')
                }
                //angular.element(currElem[e.target.dataset.index]).css('border-bottom','4px solid #0093c6');
                angular.element(currElem[e.target.dataset.index]).children().css('color','#0093c6');
                scope.setCurrentIndex(e.target.dataset.index);

                //evt.$parent.categoryMenu.data
                var currSelObj = scope.categoryMenu.data.categories.map(function(x){if(x.link == e.target.dataset.id){return x;}});
                console.log('emitting the message');
                scope.$emit("showSubMenu",currSelObj);

            });
        //(end) code in future it will use
        }*/
    };

    return directive;
}

class CategoryMenuController {
    constructor($scope, $log, $document, $timeout, $window, dataServices) {
        'ngInject';

        let vm = this;

        vm.DI = () => ({ $scope, $log, $document, $timeout, $window });

        angular.element($window).bind('resize', () => {
            vm._sizeMegaMenuPopover();
        });

        vm.categories = [];

        dataServices.appInfo().then(response => {
            $log.debug("APP INFO :", response);
            vm.categories = response.cats;
            angular.forEach(vm.categories, (cat) => {
                angular.forEach(cat.children, (child, index) => {
                    child.displayChildren = [];
                    child.displayChildren[0] = [];
                    let colCnt = 0;
                    angular.forEach(child.children, (gChild, index) => {
                        child.displayChildren[colCnt].push(gChild);
                        if (index % 10 === 0 && index / 10 >= 1) {
                            //child.gChildCount = 0;
                            colCnt++;
                            child.displayChildren[colCnt] = [];
                        }
                    });
                    $log.debug(child.name, "displayChildren :", child.displayChildren);
                });

            });

            /*vm.search.categories = response.cats.map(function (cat) {
                return cat.name;
            });*/
        }, error => {

        });

        /*vm.data = {
            "categories": [{
                "name": "Commercial Vehicle",
                "link": "1",
                "sub": [{
                    "name": "Driveline",
                    "link": "1-0",
                    "sub": [{
                        "name": "Center Bearings",
                        "link": "1-0-0",
                        "sub": ""
                    }, {
                            "name": "Components",
                            "link": "1-0-1",
                            "sub": ""
                        }, {
                            "name": "Cores",
                            "link": "1-0-2",
                            "sub": ""
                        }, {
                            "name": "Driveshaft",
                            "link": "1-0-2",
                            "sub": ""
                        }, {
                            "name": "Flanges",
                            "link": "1-0-3",
                            "sub": ""
                        }]
                }, {
                        "name": "Heavy Axle",
                        "link": "1-1",
                        "sub": [{
                            "name": "Brake and Wheel",
                            "link": "1-1-0",
                            "sub": ""
                        }, {
                                "name": "Components",
                                "link": "1-1-1",
                                "sub": ""
                            }, {
                                "name": "Chasis Parts",
                                "link": "1-1-2",
                                "sub": ""
                            }, {
                                "name": "Drive Axles",
                                "link": "1-1-3",
                                "sub": ""
                            }, {
                                "name": "Reman Units",
                                "link": "1-1-4",
                                "sub": ""
                            }]
                    }, {
                        "name": "Lubricants",
                        "link": "1-2",
                        "sub": [{
                            "name": "Synthetic",
                            "link": "1-2-0",
                            "sub": ""
                        }, {
                                "name": "Mineral Based",
                                "link": "1-2-1",
                                "sub": ""
                            }, {
                                "name": "Semi Fluid",
                                "link": "1-2-2",
                                "sub": ""
                            }, {
                                "name": "Drive Axles",
                                "link": "1-2-3",
                                "sub": ""
                            }, {
                                "name": "Reman Units",
                                "link": "1-2-4",
                                "sub": ""
                            }]
                    }]
            }, {
                    "name": "Automotive",
                    "link": "2",
                    "sub": ""
                }, {
                    "name": "Off-Highway",
                    "link": "3",
                    "sub": ""
                }, {
                    "name": "Performance/Specialty",
                    "link": "4",
                    "sub": ""
                }, {
                    "name": "Military/defense",
                    "link": "5",
                    "sub": ""
                }, {
                    "name": "Industrial",
                    "link": "6",
                    "sub": ""
                }]
        };*/



        $scope.currentIndex = "";
        $scope.setCurrentIndex = function (index) {
            $scope.currentIndex = index;
        }

        $scope.clickHandler = function () {
            //evt.$parent.categoryMenu.data
            //  console.log('emitting the message');
            //$scope.$emit("showSubMenu");
        }


        /*        vm.init = function () {
                    vm.categories = vm.data.categories.map(function (item) {
                        item.open = false;
                        return item;
                        //var temp= {}; temp.name = item.name;temp.link=item.link; return temp
                    });
        
                };*/

        //vm.init();

    }

    catHover(cat) {
        let vm = this;
        let { $log, $document, $timeout, $window } = vm.DI();
        $log.debug("Cat hovered.", $window.innerWidth);


        let closeOthers = () => new Promise((resolve) => {
            cat.open = true;
            angular.forEach(vm.categories, function (item, index, arr) {
                if (cat.name !== item.name) {
                    item.open = false;
                }
                if (index === arr.length - 1) {
                    $log.debug(index + ":" + arr.length);
                    resolve();
                }
            });
        });
        vm.hoverTimeout = $timeout(() => {
            closeOthers().then(function () {
                $timeout(() => {
                    vm._sizeMegaMenuPopover();
                }, 150);
            });
        }, 500);


    }

    catLeave(cat) {
        let vm = this;
        let { $timeout} = vm.DI();
        cat.open = false;
        $timeout.cancel(vm.hoverTimeout);

    }

    _sizeMegaMenuPopover() {
        let vm = this;
        let { $document, $window } = vm.DI();
        let subCatList = $document[0].getElementById("subcategories");
        let subCatWidth = $window.innerWidth < 1440 ? $window.innerWidth : 1440;
        angular.element(subCatList).css("width", subCatWidth + "px");
        let subCatMarginLeft = $window.innerWidth < 1440 ? 0 : ($window.innerWidth - 1440) / 2;
        angular.element(subCatList).css("margin-left", subCatMarginLeft + "px");
    }

    setTop(index, parent) {
        let vm = this, { $document, $timeout } = vm.DI();
        console.log("Elem :", index, parent);
        if (index > 0) {
            $timeout(() => {
                let hdrStr = "cat_header_" + parent;
                console.log("Hdr str :", hdrStr);
                let hdr = $document[0].getElementById(hdrStr);
                console.log("ele height :", hdr.offsetHeight);
                let colStr = parent + "_col_" + index;
                let col = $document[0].getElementById(colStr);
                if (parent === "Industrial") {
                    angular.element(col).css("margin-top", hdr.offsetHeight +3+ "px");
                } else
                    angular.element(col).css("margin-top", hdr.offsetHeight + "px");
            });
        }
    }

}