export function nonegativeDirective() {
    'ngInject';
  
    let directive = {
        require: 'ngModel',

        // optional compile function
        compile(elem, attrs) {
            //tElement.css('position', 'absolute');

            return this.linkFunction;
        },

        linkFunction(scope, elem, attrs, ctrl) {
            if (!ctrl) return;
            ctrl.$validators.positive = function(value) {
                return value && value > 0;
            };
        }
    
}
return directive;
}
