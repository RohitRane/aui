/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('aftermarket',
    ['ngResource',
        'ui.router',
        'ui.bootstrap',
        'toastr',
        'imageZoom',
        'rzModule',
        'aftermarket.header',
        'aftermarket.home',
        'aftermarket.searchResults',
        'aftermarket.part',
        'aftermarket.category',
        'aftermarket.core']
    )
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('githubContributor', GithubContributorService)
    .service('webDevTec', WebDevTecService)
    .controller('MainController', MainController)
    .directive('acmeMalarkey', MalarkeyDirective);

//Main module.