import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { appConstants } from './index.constants';
import { MainController } from './main/main.controller';
import { mainConfig } from './main/main.config';
import "babel-polyfill";


angular.module('aftermarket',
    ['ui.router',
        'ui.bootstrap',
        'angular.filter',
        'imageZoom',
        'rzModule',
        'breadCrumb',
        'loading',
        'smooth-scroll',
        'form-controls',
        'pascalprecht.translate',
        'aftermarket.header',
        'aftermarket.home',
        'aftermarket.searchResults',
        'aftermarket.part',
        'aftermarket.category',
        'aftermarket.core',
        'aftermarket.footer',
        'aftermarket.orderList',
        'aftermarket.alt-home'
    ]
)
    .constant('AftermarketConstants', appConstants)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('MainController', MainController)
    .config(mainConfig);

//Main module.

/*Tagging for qa-06-Jul-2016-1.0*/