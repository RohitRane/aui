
import { SearchResultsController } from './search-results.controller';
import { SearchResultDirective } from './search-results.directive';
import { FilterDirective } from './filter/filter.directive';
import { routerConfig } from './search-results.route';

angular.module('aftermarket.searchResults',[])
    .controller('SearchResultsController',SearchResultsController)
    .directive('searchResultDirective',SearchResultDirective)
    .directive('filterDirective',FilterDirective)
    .config(routerConfig);
   