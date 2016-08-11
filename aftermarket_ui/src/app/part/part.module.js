import {PartController} from './part.controller';
import {routeConfig} from './part.route';
import {EmailController} from './email/email.controller';

angular.module('aftermarket.part', [])
    .config(routeConfig)
    .controller('PartController', PartController)
    .controller('EmailController', EmailController)
   