export function shareOrderList(DI) {
    return function (id) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.SHARED_ORDERLIST.setUrl(id);
            DI.log.debug("SHARED_ORDERLIST :", DI.apiConfig.SHARED_ORDERLIST);
            DI.http(DI.apiConfig.SHARED_ORDERLIST).then(function (response) {
                DI.log.debug("response :", response);
                resolve(response);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}
