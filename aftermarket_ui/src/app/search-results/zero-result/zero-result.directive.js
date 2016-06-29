export function ZeroResultDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/zero-result/zero-result.html',
        scope: {},
        controller: ZeroResultDirectiveController,
        controllerAs: 'zeroReult',
        bindToController: true
    };
    return directive;
}

class ZeroResultDirectiveController {
    constructor($log, $scope, BreadCrumbService) {
        'ngInject';
        this.dI = {
            log: $log,
            scope: $scope,
            BreadCrumbService: BreadCrumbService
        };
}


