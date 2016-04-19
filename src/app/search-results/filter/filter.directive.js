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
          this.slider = {
            minValue: 20,
            maxValue: 90,
            options: {
                floor: 0,
                ceil: 100,
                step: 1
            }
        };
    }   
    reset(){
        for (let x of this.list) {
            this.prestine[x.id] = {
                collapsed: true,
                changed: false
            };
        }
    }
    applyFilter(id, option){
        console.log(id);
         console.log(option);
    }
}


