export function subcategoryMenuDirective() {
    'ngInject';

    let directive = {
        restrict: 'C',
        templateUrl: 'app/components/header/menus/sub-categories/subcategories.html',
        /*scope: {
            //creationDate: '='
        },*/
        controller: SubCategoryMenuController,
        controllerAs: 'SubcategoryMenu',
        bindToController: true,
        replace:true,
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
            });
        }
    };
    return directive;
}

class SubCategoryMenuController{
  constructor($scope)
    {
        'ngInject';
        $scope.showSubMenu = false;
        $scope.$on('showSubMenu', function (obj,temp) {
            if(temp[0] == null || temp[0] == undefined)
            {
                $scope.showSubMenu = false;
                return;
            }

            $scope.subcategories = temp[0].sub;
            if ($scope.showSubMenu == true) {
                $scope.showSubMenu = false;
            }
            else {
                $scope.showSubMenu = true;
                $scope.$apply();
            }
            // var self =  this ;
            //var self = $scope.showSubMenu;
        })

      $scope.subcategories = [

      ];

  }
}