export function FilterDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/filter/filter.html',
        scope: {
            list: '='
        },
        controller: FilterDirectiveController,
        controllerAs: 'vm',
        bindToController: true,
    };
    return directive;
}

class FilterDirectiveController{
    constructor($log, $http){
         'ngInject';
         this.http = $http;
         this.log = $log;
         this.prestine = {};
         this.setValues();
    }   
    
     setValues(){
        angular.forEach(this.list, function(filter) {
          
        });
    }
}


