export function partSearch(dI) {
    return function () {
        return dI.q(function (resolve, reject) {
            dI.http(dI.apiConfig.PART_SEARCH).then(function (response) {
                dI.log.debug("response :", response);
                resolve(response.data.DanaResponse);
            }, function (error) {
                dI.log.debug("error", error);
                reject(error);
            });
        });
    }
}