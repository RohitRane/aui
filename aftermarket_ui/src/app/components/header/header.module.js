/*
Author : Rohit Rane
*/

import { pageHeaderDirective } from './header.directive';
import { PageHeaderController } from './header.controller';
import { langNCurrencyDirective } from './menus/lang-n-currency/lang-n-currency.directive';
import {LangNCurrencyController} from './menus/lang-n-currency/lang-n-currency.controller';
import { helpNFaqDirective } from './menus/help-n-faq/help-n-faq.directive';
import { advncdSrchDirective } from './menus/advanced-search/advanced-search.directive';
import { advncdSrchController } from './menus/advanced-search/advanced-search.controller';
import { profileMenuDirective } from './menus/profile/profile.directive';
import { orderMenuDirective } from './menus/order/order.directive';
import { categoryMenuDirective } from './menus/categories/categories.directive';
import {CategoryMenuController} from './menus/categories/categories.controller';
//import { subcategoryMenuDirective } from './menus/sub-categories/subcategories.directive';
import { searchBarDirective } from './search-bar/search-bar.directive';
import { SearchBarController } from './search-bar/search-bar.controller';
import { SearchBarService } from './search-bar/search-bar.service';
//import {TypeaheadPopupController} from './search-bar/typeahead-popup.controller';

angular.module('aftermarket.header', ['aftermarket.core'])
    .directive('pageHeader', pageHeaderDirective)
    .directive('langCurrencySelector', langNCurrencyDirective)
    .controller('LangNCurrencyController', LangNCurrencyController)
    .directive('helpNFaq', helpNFaqDirective)
    .directive('advancedSearch', advncdSrchDirective)
    .controller('AdvancedSearchController', advncdSrchController)
    .directive('profileMenu', profileMenuDirective)
    .directive('orderMenu', orderMenuDirective)
    .directive('categoryMenu', categoryMenuDirective)
    .controller('CategoryMenuController', CategoryMenuController)
    //.directive('subcategoryMenu',subcategoryMenuDirective)
    .directive('searchBar', searchBarDirective)
    .controller('SearchBarController', SearchBarController)
    .service('SearchBarService', SearchBarService)
    //.controller('TypeaheadPopupController',TypeaheadPopupController)
    .controller('PageHeaderController', PageHeaderController);