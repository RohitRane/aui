export function LoadingDirective($rootScope) {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/loading/loading.html',
        scope: {},
        controller: "LoadingController",
        controllerAs: 'vm',
        replace: true,
        link: function (scope, element, attrm, vm) {
            $rootScope.$on('showLoading', function(event, flag){
                vm.loading = flag;
            });
        }
    };
    return directive;
}
