export function emailPart(DI) {
    return function (url, from, to, sub, body) {
        return DI.q(function (resolve, reject) {
            let reqParams = {
                "partDetailUrl": url,
                "emailDTO": {
                    "from": from,
                    "toEmails": to,
                    "subject": sub,
                    "body": body
                }

            }
            DI.apiConfig.EMAIL_PART.setUrl();
            angular.extend(DI.apiConfig.EMAIL_PART, reqParams);
            DI.http(DI.apiConfig.EMAIL_PART).then(function (response) {
                DI.log.debug("response :", response.data.APIResponse);
                resolve(response.data.APIResponse);
            }, function (error) {
                DI.log.debug("error", error);
                reject(error);
            });
        });
    }
}