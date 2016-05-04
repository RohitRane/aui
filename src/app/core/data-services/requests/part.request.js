export function part(DI) {
    return function (partNumber) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.PART.setUrl(partNumber);
            DI.log.debug("Part Number :", partNumber);
            DI.http(DI.apiConfig.PART).then(function (response) {
                DI.log.debug("response :", response.data.APIResponse);
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}