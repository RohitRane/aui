export function catSearch(DI) {
    return function (searchString) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.CAT_SEARCH.setUrl(searchString);
            DI.log.debug("cat searchString :", DI.apiConfig.CAT_SEARCH);
            DI.http(DI.apiConfig.CAT_SEARCH).then(function (response) {
                DI.log.debug("response :", response);
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}