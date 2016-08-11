export function orderList(DI) {
    return function () {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.ORDER_LIST.setUrl();
            DI.http(DI.apiConfig.ORDER_LIST).then(function (response) {
                resolve(response.data);
            }, function (error) {
                reject(error);
            });
        });
    }
}