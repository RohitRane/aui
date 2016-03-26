/*
Author : Rohit Rane
*/

import { pageHeaderDirective } from './header.directive';
import { PageHeaderController } from './header.controller';
import { langNCurrencyDirective } from './menus/lang-n-currency/lang-n-currency.directive';
import { helpNFaqDirective } from './menus/help-n-faq/help-n-faq.directive';
import { profileMenuDirective } from './menus/profile/profile.directive';
import { orderMenuDirective } from './menus/order/order.directive';
import { categoryMenuDirective } from './menus/categories/categories.directive';
import { searchBarDirective } from './search-bar/search-bar.directive';
import { SearchBarController } from './search-bar/search-bar.controller';

angular.module('aftermarket.header', [])
    .directive('pageHeader', pageHeaderDirective)
    .directive('langCurrencySelector',langNCurrencyDirective)
    .directive('helpNFaq',helpNFaqDirective)
    .directive('profileMenu',profileMenuDirective)
    .directive('orderMenu',orderMenuDirective)
    .directive('categoryMenu',categoryMenuDirective)
    .directive('searchBar',searchBarDirective)
    .controller('SearchBarController',SearchBarController)
    .controller('PageHeaderController', PageHeaderController);