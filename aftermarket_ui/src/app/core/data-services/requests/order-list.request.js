export function orderList(DI) {
    return function () {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.ORDER_LIST.setUrl();
            DI.log.debug("ORDER_LIST :", DI.apiConfig.ORDER_LIST);
            DI.http(DI.apiConfig.ORDER_LIST).then(function (response) {
                DI.log.debug("response :", response);
                resolve(response.data);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}