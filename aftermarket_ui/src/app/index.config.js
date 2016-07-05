export function config($logProvider, $sceDelegateProvider, $translateProvider, AftermarketConstants) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);
    $sceDelegateProvider.resourceUrlWhitelist(['**']);

    // Set options third-party lib
    let activeLang = {};
    angular.forEach(AftermarketConstants.localization,(language)=>{
        $translateProvider.translations(language.langName, language.data);
        if(language.active){
            $translateProvider.preferredLanguage(language.langName);
        }
    }); 
    
    
        /*$translateProvider.translations('fr', {
            HEADLINE: 'Hallo, Das ist mein super App !',
            INTRO_TEXT: 'And it has i18n support!'
        });*/
    //$translateProvider.preferredLanguage(AftermarketConstants.localization.lang);
}
