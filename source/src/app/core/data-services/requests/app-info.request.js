export function appInfo(DI) {
    return function (partNumber) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.APPINFO.setUrl();
            DI.http(DI.apiConfig.APPINFO).then(function (response) {
                
                DI.log.debug("response :", response.data.APIResponse);
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}