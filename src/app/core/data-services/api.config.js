
var devServer = "http://52.8.125.250:8080",
    qaServer = "http://52.53.236.6:8080",



    activeAPIBase = devServer,
    //activeAPIBase = qaServer,
    apiBaseUrl = activeAPIBase + '/search-service/api';



//company ID
var cId = 1;

export let apiConfig = {
    /*'PART_SEARCH': {
        'url': '',
        'setUrl': function (param) {
            this.url = apiBaseUrl + '/result?q=' + param + '&cid=' + cId + '&from=0&size=10';
        },
        'method': 'GET',
        'data': {}
    },*/

    'YMM_SEARCH': {
        'url': '',
        'setUrl': function (searchString, category, prodLine, year, make, model, from, size) {
            this.url = apiBaseUrl + '/result';
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
            this.url = apiBaseUrl + '/orderList/create';
        },
        'method': 'POST',
        'data': {}
    },

    'SHARE_LIST': {
        'url': '',
        'setUrl': function (payload) {
            this.url = apiBaseUrl + '/saveOrderList';
            this.data = payload
        },
        'method': 'POST',
        'data': {}
    },

    'AUTO_SEARCH': {
        'url': '',
        'setUrl': function (param, category) {
            this.url = apiBaseUrl + '/suggest';
            this.data = {
                "q": param,
                "cats": [category, null, null]
            }
        },
        'method': 'POST',
        'data': {}
    },
    'CAT_SEARCH': {
        'url': '',
        'setUrl': function (param, scope, from, size, productCategory, filterObjectArray, year, make, model, ymm, cat2) {
            this.url = apiBaseUrl + '/result';
            //scope == "All" && productCategory ?  ( scope = productCategory, productCategory = null) : '';
            //productCategory === 
            
            console.log("Inside seturl");
            console.log("getParts :", year, make, model, cat2);
            this.data = {
                "q": param,
                "from": from,
                "size": size,
                "cats": [scope ? scope : 0, cat2 ? cat2 : 0, productCategory ? productCategory : 0],
                "filter": filterObjectArray,
                "year": year,
                "make": make,
                "model": model,
                "ymm": ymm
            }
        },
        'method': 'POST',
        'data': {}
    },
    'PART': {
        'url': '',
        'setUrl': function (param) {
            this.url = apiBaseUrl + '/part/' + param;
        },
        'method': 'GET',
        'data': {}
    },
    'PART_BY_PNUM': {
        'url': '',
        'setUrl': function (param) {
            console.log("PARAM :::::", param);
            this.url = apiBaseUrl + '/part/partnumber/' + param;
        },
        'method': 'GET',
        'data': {}
    },
    'APPINFO': {
        'url': apiBaseUrl + '/appInfo',
        'method': 'GET'
    }
}
