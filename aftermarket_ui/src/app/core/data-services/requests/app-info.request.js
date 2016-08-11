export function appInfo(DI) {
    return function (partNumber) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.APPINFO.setUrl();
            DI.http(DI.apiConfig.APPINFO).then(function (response) {
                
                resolve(response.data.APIResponse);
            }, function (error) {
                reject(error);
            });
        });
    }
}