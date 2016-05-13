
import { SearchResultsController } from './search-results.controller';
import { PartCardDirective } from './part-card/part-card.directive';
import { ymmDirective } from './ymm/ymm.directive';
import { FilterDirective } from './filter/filter.directive';
import { routerConfig } from './search-results.route';
import { YmmService } from './ymm/ymm.services';

angular.module('aftermarket.searchResults',[])
    .controller('SearchResultsController',SearchResultsController)
    .directive('partCardDirective',PartCardDirective)
    .directive('filterDirective',FilterDirective)
    .directive('ymmDirective',ymmDirective)
    .service('YmmService',YmmService)
    .config(routerConfig);
   