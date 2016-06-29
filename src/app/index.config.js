export function config($logProvider, $sceDelegateProvider, $translateProvider, AftermarketConstants) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);
    $sceDelegateProvider.resourceUrlWhitelist(['**']);

    // Set options third-party lib

    $translateProvider.translations(AftermarketConstants.localization.lang, AftermarketConstants.localization.data);
    
        /*$translateProvider.translations('fr', {
            HEADLINE: 'Hallo, Das ist mein super App !',
            INTRO_TEXT: 'And it has i18n support!'
        });*/
    $translateProvider.preferredLanguage(AftermarketConstants.localization.lang);
}
