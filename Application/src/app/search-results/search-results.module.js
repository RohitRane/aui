
import { SearchResultsController } from './search-results.controller';
import { PartCardDirective } from './part-card/part-card.directive';
import { FilterDirective } from './filter/filter.directive';
import { routerConfig } from './search-results.route';

angular.module('aftermarket.searchResults',[])
    .controller('SearchResultsController',SearchResultsController)
    .directive('partCardDirective',PartCardDirective)
    .directive('filterDirective',FilterDirective)
    .config(routerConfig);
   