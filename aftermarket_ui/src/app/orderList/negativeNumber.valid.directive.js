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
                debugger;
                let abc;
                let ret = true;
                if(angular.isDefined(value) && value!==""){
                    ret =  (value > 0);
                }
                 
                return ret;
                
            }
        }
    
}
return directive;
}
