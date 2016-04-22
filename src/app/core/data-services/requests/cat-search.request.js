export function catSearch(DI) {
    return function (searchString, category) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.CAT_SEARCH.setUrl(searchString, category);
            DI.log.debug("cat searchString :", DI.apiConfig.CAT_SEARCH);
            DI.http(DI.apiConfig.CAT_SEARCH).then(function (response) {
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