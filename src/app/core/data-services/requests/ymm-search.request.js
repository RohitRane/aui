export function ymmSearch(DI) {
    return function (searchString, category, from, size, productCategory, filterObjectArray) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.YMM_FULL_SEARCH.setUrl(searchString, category, from, size, productCategory, filterObjectArray);
            DI.log.debug("cat searchString :", DI.apiConfig.CAT_SEARCH);
            DI.http(DI.apiConfig.YMM_FULL_SEARCH).then(function (response) {
                DI.log.debug("response :", response);
                response.data.APIResponse.resultSetLimit = size;
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}