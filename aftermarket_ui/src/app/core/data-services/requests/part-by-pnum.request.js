export function partByPartNum(DI) {
    return function (partNumber) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.PART_BY_PNUM.setUrl(partNumber);
            DI.http(DI.apiConfig.PART_BY_PNUM).then(function (response) {
                resolve(response.data.APIResponse);
            }, function (error) {
                reject(error);
            });
        });
    }
}