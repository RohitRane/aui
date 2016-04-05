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
        bindToController: true
    };
    return directive;
}

class FilterDirectiveController{
    constructor(){
         'ngInject';
          this.tempId = '';
          this.prestine = {};
          this.reset();
    }   
    reset(){
        for (let x of this.list) {
            this.prestine[x.id] = {
                collapsed: true,
                changed: false
            };
        }
    }
}


