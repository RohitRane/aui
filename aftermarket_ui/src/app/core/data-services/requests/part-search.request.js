export function partSearch(DI) {
    return function (searchString) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.PART_SEARCH.setUrl(searchString);
            DI.http(DI.apiConfig.PART_SEARCH).then(function (response) {
                response.data.APIResponse.resultSetLimit = 10;
                resolve(response.data.APIResponse);
            }, function (error) {
                reject(error);
            });
        });
    }
}