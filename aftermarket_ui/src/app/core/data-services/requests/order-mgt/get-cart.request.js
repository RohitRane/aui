export function getCart(DI) {
    return function (cart_type) {
        return DI.q(function (resolve, reject) {
            DI.apiConfig.GET_CART.setUrl(cart_type);
            DI.http(DI.apiConfig.GET_CART).then(function (response) {
                
                DI.log.debug("response :", response.data.APIResponse);
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}