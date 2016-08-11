export function part(DI) {
    return function (partNumber, icNumber) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.PART.setUrl(partNumber, icNumber);
            DI.http(DI.apiConfig.PART).then(function (response) {
                resolve(response.data.APIResponse);
            }, function (error) {
                reject(error);
            });
        });
    }
}