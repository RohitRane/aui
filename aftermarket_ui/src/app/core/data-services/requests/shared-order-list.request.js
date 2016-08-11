export function shareOrderList(DI) {
    return function (id) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.SHARED_ORDERLIST.setUrl(id);
            DI.http(DI.apiConfig.SHARED_ORDERLIST).then(function (response) {
                resolve(response);
            }, function (error) {
                reject(error);
            });
        });
    }
}
