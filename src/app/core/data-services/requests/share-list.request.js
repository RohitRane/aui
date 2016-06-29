export function shareList(DI) {
    return function (payload) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.SHARE_LIST.setUrl(payload);
            DI.log.debug("SHARE_LIST :", DI.apiConfig.SHARE_LIST);
            DI.http(DI.apiConfig.SHARE_LIST).then(function (response) {
                DI.log.debug("response :", response);
                resolve(response.data);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}
