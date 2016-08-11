export function multipleemailsDirective() {
    'ngInject';
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    let directive = {
        require: 'ngModel',
        scope: {},

        // optional compile function
        compile(elem, attrs) {
            //tElement.css('position', 'absolute');

            return this.linkFunction;
        },

        linkFunction(scope, element, attrs, ctrl) {
          ctrl.$parsers.unshift(function(viewValue) {
  
            var emails = viewValue.split(',');
            // define single email validator here
            var re = /\S+@\S+\.\S+/; 
              
            // angular.foreach(emails, function() {
              var validityArr = emails.map(function(str){
                  return re.test(str.trim());
              }); // sample return is [true, true, true, false, false, false]
              var atLeastOneInvalid = false;
              angular.forEach(validityArr, function(value) {
                if(value === false)
                  atLeastOneInvalid = true; 
              }); 
              if(!atLeastOneInvalid) { 
                // ^ all I need is to call the angular email checker here, I think.
                ctrl.$setValidity('multipleemailsDirective', true);
                return viewValue;
              } else {
                ctrl.$setValidity('multipleemailsDirective', false);
                return undefined;
              }
            // })
          });
        }
    };
    return directive;
}
