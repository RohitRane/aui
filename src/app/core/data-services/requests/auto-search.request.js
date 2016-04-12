export function autoSearch(DI) {
    return function (searchString) {
        return DI.q(function (resolve, reject) {
            DI.log.debug("searchstring :",searchString);
            DI.apiConfig.AUTO_SEARCH.setUrl(searchString);
            DI.http(DI.apiConfig.AUTO_SEARCH).then(function (response) {
                DI.log.debug("response :", response);
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}