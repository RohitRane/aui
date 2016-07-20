export function partByPartNum(DI) {
    return function (partNumber) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.PART_BY_PNUM.setUrl(partNumber);
            DI.log.debug("Part Number :", partNumber);
            DI.http(DI.apiConfig.PART_BY_PNUM).then(function (response) {
                DI.log.debug("response :", response.data.APIResponse);
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}