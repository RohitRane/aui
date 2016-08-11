export function ymmSearch(DI) {
    return function (searchString, category,prodLine,year,make,model,from, size ) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.YMM_SEARCH.setUrl(searchString,category,prodLine,year,make,model,from, size);
            DI.http(DI.apiConfig.YMM_SEARCH).then(function (response) {
                //response.data.APIResponse.resultSetLimit = size;
                resolve(response.data.APIResponse);
            }, function (error) {
                reject(error);
            });
        });
    }
}