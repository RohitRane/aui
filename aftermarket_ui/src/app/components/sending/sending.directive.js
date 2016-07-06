export function SendingDirective($rootScope) {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/sending/sending.html',
        scope: {},
        controller: "SendingController",
        controllerAs: 'vm',
        replace: true,
        link: function (scope, element, attrm, vm) {
            $rootScope.$on('showLoading', function(event, flag){
                vm.sending = flag;
            });
        }
    };
    return directive;
}
