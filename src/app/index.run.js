export function runBlock($rootScope, $location, SearchBarService) {
    'ngInject';
    
    $rootScope.$on('$stateChangeSuccess', function (event, state, current) {
      console.log("stateChangeSuccess ", $location.path());
    });
}
