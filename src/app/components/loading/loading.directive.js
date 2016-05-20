export function LoadingDirective() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/loading/loading.html',
        scope: {
            loading: '='
        },
        controller: "LoadingController",
        controllerAs: 'vm',
        replace: true,
        link: function (scope, element, attr) {
          console.log("loading link");
              scope.$watch('loading', function (val) {
              });
        }
    };
    return directive;
}
