export function config($logProvider, $sceDelegateProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
    // Set options third-party lib

}
