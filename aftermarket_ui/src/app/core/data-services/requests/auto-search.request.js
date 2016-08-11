export function autoSearch(DI) {
    return function (searchString, category, scope) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.AUTO_SEARCH.setUrl(searchString, category, scope);
            DI.http(DI.apiConfig.AUTO_SEARCH).then(function (response) {
                response.data.APIResponse.resultSetLimit = 10;
                resolve(response.data.APIResponse);
            }, function (error) {
                reject(error);
            });
        });
    }
}