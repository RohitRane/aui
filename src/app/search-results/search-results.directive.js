export function SearchResultDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/search-results-directive.html',
        scope: {
            list: '='
        },
        controller: SearchResultDirectiveController,
        controllerAs: 'searchResult',
        bindToController: true,
    };
    return directive;
}

class SearchResultDirectiveController{
    constructor($log, $http){
         'ngInject';
         this.http = $http;
         this.log = $log;
    }
}


