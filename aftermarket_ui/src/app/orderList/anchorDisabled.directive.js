export
function adisabledDirective() {
    'ngInject';

    let directive = {

        // optional compile function
        compile(tElement, tAttrs, transclude) {
            //Disable ngClick
            tAttrs["ngClick"] = "!("+tAttrs["adisabledDirective"]+") && ("+tAttrs["ngClick"]+")";

            //Toggle "disabled" to class when aDisabled becomes true
            return function (scope, iElement, iAttrs) {
                scope.$watch(iAttrs["adisabledDirective"], function(newValue) {
                    if (newValue !== undefined) {
                        iElement.toggleClass("disabled", newValue);
                    }
                });

                //Disable href on click
                iElement.on("click", function(e) {
                    if (scope.$eval(iAttrs["adisabledDirective"])) {
                        e.preventDefault();
                    }
                });
            };
        }
       
    }
     return directive;
}