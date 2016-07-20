export function nospecialcharDirective() {
    'ngInject';
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    let directive = {
        require: 'ngModel',
      restrict: 'A',

        // optional compile function
        compile(elem, attrs) {
            //tElement.css('position', 'absolute');

            return this.linkFunction;
        },

        linkFunction(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function(inputValue) {
          if (inputValue == undefined)
            return ''
         var cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
          if (cleanInputValue != inputValue) {
            modelCtrl.$setViewValue(cleanInputValue);
            modelCtrl.$render();
          }
          return cleanInputValue;
        });
      }
    };
    return directive;
}
