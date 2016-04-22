export function categoryMenuDirective($document) {
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
        replace:true,
        link: function(scope, elem, attrs,controller) {
        //(start) code in future it will use
            // elem.bind('click', function(e) {

            //     $document.on('click', function (e) {
            //         if (elem !== e.target && !elem[0].contains(e.target)) {
            //             scope.$apply(function () {
            //                 //scope.$eval(scope.showSubMenu);
            //                 scope.showSubMenu = !scope.showSubMenu;
            //                 return;
            //             });
            //         }
            //     });

            //     var currElem = elem.find('li');//.attr('src');
            //     if(scope.currentIndex !=="")
            //     {
            //         currElem[scope.currentIndex].style.borderBottom ='none';
            //         //angular.element(currElem[scope.currentIndex]).find('a').css('color','white')
            //     }
            //     //angular.element(currElem[e.target.dataset.index]).css('border-bottom','4px solid #0093c6');
            //     angular.element(currElem[e.target.dataset.index]).children().css('color','#0093c6');
            //     scope.setCurrentIndex(e.target.dataset.index);

            //     //evt.$parent.categoryMenu.data
            //     var currSelObj = scope.categoryMenu.data.categories.map(function(x){if(x.link == e.target.dataset.id){return x;}});
            //     console.log('emitting the message');
            //     scope.$emit("showSubMenu",currSelObj);

            // });
        //(end) code in future it will use
        }
    };

    return directive;
}


function tester(){
    alert('hi');
}

class CategoryMenuController{
  constructor($scope,$document){
        'ngInject';

       this.data =  {
           "categories": [{
               "name": "Commercial Vehicles",
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
               "name": "Light Vehicles",
               "link": "2",
               "sub": ""
           }, {
               "name": "Off-Highway",
               "link": "3",
               "sub": ""
           }, {
               "name": "High Performance",
               "link": "4",
               "sub": ""
           }, {
               "name": "Military/defence",
               "link": "5",
               "sub": ""
           }, {
               "name": "Industrial",
               "link": "6",
               "sub": ""
           }]
       };

      this.categories =[];

        $scope.currentIndex ="";
        $scope.setCurrentIndex = function(index){
            $scope.currentIndex = index;
        }

        $scope.clickHandler = function(evt){
            //evt.$parent.categoryMenu.data
          //  console.log('emitting the message');
            //$scope.$emit("showSubMenu");
        }


       this.init = function(){
           this.categories = this.data.categories.map(function(item){
                return item;
               //var temp= {}; temp.name = item.name;temp.link=item.link; return temp
             });

        };
        this.init();

  };



}