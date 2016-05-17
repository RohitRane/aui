export function ymmSearch(DI) {
    return function (searchString, category,prodLine,year,make,model,from, size ) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.YMM_SEARCH.setUrl(searchString,category,prodLine,year,make,model,from, size);
            DI.log.debug("cat searchString :", DI.apiConfig.YMM_SEARCH);
            DI.http(DI.apiConfig.YMM_SEARCH).then(function (response) {
                DI.log.debug("response :", response);
                //response.data.APIResponse.resultSetLimit = size;
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}