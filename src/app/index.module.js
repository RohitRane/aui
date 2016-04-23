/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { appConstants } from './index.constants';
import { MainController } from './main/main.controller';

angular.module('aftermarket',
    ['ngResource',
        'ui.router',
        'ui.bootstrap',
        'imageZoom',
        'aftermarket.header',
        'aftermarket.home',
        'aftermarket.searchResults',
        'aftermarket.part',
        'aftermarket.category',
        'aftermarket.core']
    )
    .constant('appConstants', appConstants)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('MainController', MainController);

//Main module.