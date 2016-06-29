export function autoSearch(DI) {
    return function (searchString, category, scope) {
        return DI.q(function (resolve, reject) {
            DI.log.debug("searchstring :", searchString);
            DI.apiConfig.AUTO_SEARCH.setUrl(searchString, category, scope);
            DI.http(DI.apiConfig.AUTO_SEARCH).then(function (response) {
                DI.log.debug("response :", response);
                response.data.APIResponse.resultSetLimit = 10;
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}