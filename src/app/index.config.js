export function config($logProvider, $sceDelegateProvider,$translateProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);
    $sceDelegateProvider.resourceUrlWhitelist(['**']);

    // Set options third-party lib

    $translateProvider.translations('en', {
	    HEADLINE: 'Hello there, This is my awesome app!',
	    INTRO_TEXT: 'And it has i18n support!'
  	});

  	$translateProvider.translations('fr', {
	    HEADLINE: 'Hallo, Das ist mein super App !',
	    INTRO_TEXT: 'And it has i18n support!'
  	});
     $translateProvider.preferredLanguage('fr');
}
