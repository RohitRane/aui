
import { SearchResultsController } from './search-results.controller';
import { PartCardDirective } from './part-card/part-card.directive';
import { ymmDirective } from './ymm/ymm.directive';
import { FilterDirective } from './filter/filter.directive';
import { routerConfig } from './search-results.route';
import { YmmService } from './ymm/ymm.services';
import { OtherResultDirective } from './null-search/other-result.directive';

angular.module('aftermarket.searchResults',[])
    .controller('SearchResultsController',SearchResultsController)
    .directive('partCardDirective',PartCardDirective)
    .directive('filterDirective',FilterDirective)
    .directive('ymmDirective',ymmDirective)
    .directive('otherResult',OtherResultDirective)
    .service('YmmService',YmmService)
    .config(routerConfig);
   