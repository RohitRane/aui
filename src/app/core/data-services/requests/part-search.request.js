export function partSearch(DI) {
    return function () {
        return DI.q(function (resolve, reject) {
            DI.http(DI.apiConfig.PART_SEARCH).then(function (response) {
                DI.log.debug("response :", response);
                resolve(response.data.DanaResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}