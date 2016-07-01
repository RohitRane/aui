export function noSplCharDirective() {
    'ngInject';

    let directive = {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('keypress', (e) => {
                var regex = new RegExp("^[0-9]+$");
                var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (regex.test(str)) {
                    return true;
                }

                e.preventDefault();
                return false;
            });
        }
    };

    return directive;
}