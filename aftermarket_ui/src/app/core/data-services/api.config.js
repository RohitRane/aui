
var devServer = "http://52.8.125.250:8080",
    qaServer = "http://52.53.236.6";


//activeAPIBase = devServer,
//activeAPIBase = qaServer,
//apiConfig.REQPOINT() = activeAPIBase + '/search-service/api';




//company ID
var cId = 1;

export let apiConfig = {
    /*'PART_SEARCH': {
        'url': '',
        'setUrl': function (param) {
            this.url = apiConfig.REQPOINT() + '/result?q=' + param + '&cid=' + cId + '&from=0&size=10';
        },
        'method': 'GET',
        'data': {}
    },*/

    'BASEURL': '',
    'ENDPOINT': '',
    'REQPOINT': function () {
        return apiConfig.BASEURL + apiConfig.ENDPOINT;
    },
    'YMM_SEARCH': {
        'url': '',
        'setUrl': function (searchString, category, prodLine, year, make, model, from, size) {
            this.url = apiConfig.REQPOINT() + '/result';
            this.data = {
                "q": searchString,
                "cats": [category, null, prodLine],
                "year": year,
                "make": make,
                "model": model,
                "from": from,
                "size": size
            }
        },
        'method': 'POST',
        'data': {}
    },

    'ORDER_LIST': {
        'url': '',
        'setUrl': function () {
            this.url = apiConfig.REQPOINT() + '/orderList/create';
        },
        'method': 'POST',
        'data': {}
    },

    'SHARE_LIST': {
        'url': '',
        'setUrl': function (payload) {
            this.url = apiConfig.REQPOINT() + '/saveOrderList';
            this.data = payload
        },
        'method': 'POST',
        'data': {}
    },

    'SHARED_ORDERLIST': {
        'url': '',
        'setUrl': function (id) {
            this.url = apiConfig.REQPOINT() + '/orders/' + id;
        },
        'method': 'GET',
        'data': {}
    },

    'AUTO_SEARCH': {
        'url': '',
        'setUrl': function (param, category, scope) {
            let catNames = [];

            catNames[0] = scope ? scope.name : null;
            this.url = apiConfig.REQPOINT() + '/suggest';
            this.data = {
                "q": param,
                "cats": [category, null, null],
                "catNames": catNames
            }
        },
        'method': 'POST',
        'data': {}
    },
    'CAT_SEARCH': {
        'url': '',
        'setUrl': function (param, scope, from, size, productCategory, filterObjectArray, year, make, model, ymm, cat2, sort, catNames, intChgPartSearch) {
            this.url = apiConfig.REQPOINT() + '/result';
            //scope == "All" && productCategory ?  ( scope = productCategory, productCategory = null) : '';
            //productCategory === 

            /*let catNames = [];
            let prodline = angular.fromJson(sessionStorage.productLine),
                prodclass = angular.fromJson(sessionStorage.productClass),
                prodcat = angular.fromJson(sessionStorage.productCategory);

            catNames[0] = prodline ? prodline.name : null;
            catNames[1] = prodclass ? prodclass.name : null;
            catNames[2] = prodcat ? prodcat.name : null;*/
            //console.log("getParts :", year, make, model, cat2);
            this.data = {
                "q": param,
                "from": from,
                "size": size,
                "cats": [scope ? scope : 0, cat2 ? cat2 : 0, productCategory ? productCategory : 0],
                "filter": filterObjectArray,
                "year": year,
                "make": make,
                "model": model,
                "ymm": ymm,
                "sort": sort ? sort : null,
                "catNames": catNames,
                "intChgPartSearch":intChgPartSearch 
            }
        },
        'method': 'POST',
        'data': {}
    },
    'PART': {
        'url': '',
        'setUrl': function (param, icNumber) {
            this.url = apiConfig.REQPOINT() + '/part/' + param + "?interChgNumber=" + icNumber;
        },
        'method': 'GET',
        'data': {}
    },
    'PART_BY_PNUM': {
        'url': '',
        'setUrl': function (param) {
            this.url = apiConfig.REQPOINT() + '/part/partnumber/' + param;
        },
        'method': 'GET',
        'data': {}
    },
    'APPINFO': {
        'url': '',
        'setUrl': function () {
            this.url = apiConfig.REQPOINT() + '/appInfo';
        },
        'method': 'GET'
    },
    'EMAIL_PART': {
        'url': '',
        'setUrl': function () {
            this.url = apiConfig.REQPOINT() + '/partDetail/email';
        },
        'method': 'POST',
        'data': {
            "partDetailUrl": "",
            "emailDTO": {
                "from": "",
                "toEmails": [],
                "subject": "",
                "body": ""
            }

        }

    }

}
