export function shareList(DI) {
    return function (payload) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.SHARE_LIST.setUrl(payload);
            DI.http(DI.apiConfig.SHARE_LIST).then(function (response) {
                resolve(response.data);
            }, function (error) {
                reject(error);
            });
        });
    }
}
