
import { SearchResultsController } from './search-results.controller';
import { routerConfig } from './search-results.route';

angular.module('aftermarket.searchResults',[])
    .controller('SearchResultsController',SearchResultsController)
    .config(routerConfig);
   