export function catSearch(DI) {
    return function (searchString, category, from, size, productCategory, filterObjectArray, year, make, model, ymm) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.CAT_SEARCH.setUrl(searchString, category, from, size, productCategory, filterObjectArray, year, make, model, ymm);
            DI.log.debug("cat searchString :", DI.apiConfig.CAT_SEARCH);
            DI.http(DI.apiConfig.CAT_SEARCH).then(function (response) {
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