export function catSearch(DI) {
    return function (searchString, category, from, size, productCategory, filterObjectArray, year, make, model, ymm, cat2, sort) {
        return DI.q(function (resolve, reject) {

            DI.log.debug("cat searchString :", DI.apiConfig.CAT_SEARCH);
            let catNames = [];

            let intvl = setInterval(() => {
                if (DI.appInfoService.appInfo) {
                    clearInterval(intvl);
                    catNames[0] = category ? DI.appInfoService.getCat1(category).name : null;
                    catNames[1] = category ? DI.appInfoService.getCat2(category, cat2).name : null;
                    catNames[2] = category ? DI.appInfoService.getCat3(category, cat2, productCategory).name : null;
                    DI.apiConfig.CAT_SEARCH.setUrl(searchString, category, from, size, productCategory, filterObjectArray, year, make, model, ymm, cat2, sort, catNames);
                    DI.http(DI.apiConfig.CAT_SEARCH).then(function (response) {
                        DI.log.debug("response :", response);
                        response.data.APIResponse.resultSetLimit = size;
                        resolve(response.data.APIResponse);
                    }, function (error) {
                        DI.log.debug("error", error);
                        reject(error);
                    });
                }
            }, 100);
        });
    }
}